package com.itc.iblog.utils;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.v4.content.ContextCompat;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.itc.iblog.R;
import com.itc.iblog.models.PostModel;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;


public class HelperClass  {
    private  static Bitmap bitmap;
    private static Activity activity;
    private HelperClass helperClass;
    public HelperClass() {}

    public HelperClass getInstance(Activity activity) {
        if (null != helperClass) {
            helperClass = new HelperClass();
        }
        this.activity = activity;
        return helperClass;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public static Bitmap loadImage(PostModel post) {
        StorageReference storageRef = FirebaseStorage.getInstance().getReference();
        if (ContextCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            StorageReference pathReference = storageRef.child("Posts").child(post.getPostId()).child("image");
            final long ONE_MEGABYTE = 1024 * 1024;
            pathReference.getBytes(ONE_MEGABYTE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                @Override
                public void onSuccess(byte[] bytes) {
                    bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);

                }

            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {
                    System.out.println("Image not found.");
                }
            });
            return bitmap;
        } else {
            String root = Environment.getExternalStorageDirectory().toString();
            File dir = new File(root + "/iBlog_posts_images");

            if (!dir.exists()) {
                dir.mkdir();
            }
            final File file = new File(dir, "post" + post.getPostId() + ".png");
            if (!file.exists()) {
                StorageReference pathReference = storageRef.child("Posts").child(post.getPostId()).child("image");
                final long ONE_MEGABYTE = 1024 * 1024;
                pathReference.getBytes(ONE_MEGABYTE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                    @Override
                    public void onSuccess(byte[] bytes) {
                        Bitmap bmp;
                        bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                        FileOutputStream fOut = null;

                        try {
                            fOut = new FileOutputStream(file);
                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        }

                        bitmap = bmp;
                        bmp.compress(Bitmap.CompressFormat.PNG, 85, fOut);
                        try {
                            fOut.flush();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        try {
                            fOut.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                    }

                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        System.out.println(R.string.image_not_found);
                    }
                });
                System.out.println("bla " + bitmap);
                return bitmap;

            } else {
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inPreferredConfig = Bitmap.Config.ARGB_8888;
                bitmap = BitmapFactory.decodeFile(String.valueOf(file), options);
                return BitmapFactory.decodeFile(String.valueOf(file), options);
            }

        }
    }
}