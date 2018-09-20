import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService, Base64Service } from '../../core/index';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  providers: [LoginService, Base64Service]
})
export class LoginComponent implements OnInit {
  static w: number;
  static h: number;
  static maxStars = 800;
  static count = 0;
  static ctx: any;
  static canvas2: any;
  static hue: number;
  static stars = [];
  private canvas: any;
  private orbitRadius: any;
  private radius: any;
  private orbitX: any;
  private orbitY: any;
  private timePassed: any;
  private speed: any;
  private alpha: any;
  validateForm: FormGroup;

  static maxOrbit(x: number, y: number) {
    const max = Math.max(x, y);
    const diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  }

  static randomSelf(min: number, max?: number) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }
    if (min > max) {
      const hold = max;
      max = min;
      min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static animation() {
    LoginComponent.ctx.globalCompositeOperation = 'source-over';
    LoginComponent.ctx.globalAlpha = 0.5; // 尾巴
    LoginComponent.ctx.fillStyle = 'hsla(' + LoginComponent.hue + ', 64%, 6%, 2)';
    LoginComponent.ctx.fillRect(0, 0, LoginComponent.w, LoginComponent.h);
    LoginComponent.ctx.globalCompositeOperation = 'lighter';
    for (let i = 1, l = LoginComponent.stars.length; i < l; i++) {
      LoginComponent.stars[i].draw();
    }
    window.requestAnimationFrame(LoginComponent.animation);
  }

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private base: Base64Service,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initCanvas();
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.resize();
  }

  resize() {
    window.addEventListener('resize', () => {
      window.location.reload();
    });
  }

  initCanvas() {
    this.canvas = document.getElementById('canvas');
    LoginComponent.ctx = this.canvas.getContext('2d');
    LoginComponent.w = this.canvas.width = window.innerWidth;
    LoginComponent.h = this.canvas.height = window.innerHeight;
    LoginComponent.hue = 217;

    LoginComponent.canvas2 = document.createElement('canvas');
    const ctx2 = LoginComponent.canvas2.getContext('2d');
    LoginComponent.canvas2.width = 100;
    LoginComponent.canvas2.height = 100;
    const half = LoginComponent.canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + LoginComponent.hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + LoginComponent.hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
    this.Star.prototype.draw = this.draw;
    for (let i = 0; i < LoginComponent.maxStars; i++) {
      const ded = new this.Star();
    }
    LoginComponent.animation();
  }

  Star() {
    this.orbitRadius = LoginComponent.randomSelf(LoginComponent.maxOrbit(LoginComponent.w, LoginComponent.h));
    this.radius = LoginComponent.randomSelf(60, this.orbitRadius) / 8;
    this.orbitX = LoginComponent.w / 2;                   // 星星大小
    this.orbitY = LoginComponent.h / 2;
    this.timePassed = LoginComponent.randomSelf(0, LoginComponent.maxStars);
    this.speed = LoginComponent.randomSelf(this.orbitRadius) / 800000;
    this.alpha = LoginComponent.randomSelf(2, 10) / 10;            // 星星移动速度

    LoginComponent.count++;
    LoginComponent.stars[LoginComponent.count] = this;
  }

  draw() {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    const twinkle = LoginComponent.randomSelf(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    LoginComponent.ctx.globalAlpha = this.alpha;
    LoginComponent.ctx.drawImage(LoginComponent.canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.validateForm.value.password = this.base.encode(this.validateForm.value.password);
    this.localStorageService.clearAll();
    this.service.login(this.validateForm.value).subscribe((resp) => {
      const res: any = resp;
      if (res.code === 10200) {
        this.localStorageService.set('accessToken', res.accessToken);
        this.localStorageService.set('rootUserName', res.data[0].username);
        this.localStorageService.set('rootUserId', res.data[0].id);
        this.localStorageService.set('rootRoleName', res.data[0].rolename);
        this.router.navigateByUrl('container');
      }
      }
    );
  }
}
