package com.itc.iblog.activities;

import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.itc.iblog.R;

    public class SplashActivity extends AppCompatActivity {
        public void onAttachedToWindow() {
            super.onAttachedToWindow();
            Window window = getWindow();
            window.setFormat(PixelFormat.RGBA_8888);
        }

        Thread splashTread;
        TextView textView;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_splashscreen);

            StartAnimations();
        }

        private void StartAnimations() {
            Animation animation = AnimationUtils.loadAnimation(this, R.anim.alpha);
            animation.reset();
            LinearLayout linearLayout = (LinearLayout) findViewById(R.id.lin_lay);
            linearLayout.clearAnimation();
            linearLayout.startAnimation(animation);
            animation = AnimationUtils.loadAnimation(this, R.anim.translate);
            animation.reset();
            textView = (TextView) findViewById(R.id.splash_text);
            textView.clearAnimation();
            textView.startAnimation(animation);

            splashTread = new Thread() {
                @Override
                public void run() {
                    try {
                        int waited = 0;
                        // Splash screen pause time
                        while (waited < 2000) {
                            sleep(100);
                            waited += 100;
                        }
                        Intent intent = new Intent(SplashActivity.this,
                                LoginRegisterActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                        startActivity(intent);
                        SplashActivity.this.finish();
                    } catch (InterruptedException e) {
                    } finally {
                        SplashActivity.this.finish();
                    }

                }
            };
            splashTread.start();
        }

    }

