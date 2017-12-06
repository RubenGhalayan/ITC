package com.itc.iblog.services;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.support.v7.app.NotificationCompat;
import android.widget.RemoteViews;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.messaging.RemoteMessage;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;

import java.util.Calendar;
import java.util.Date;

import static android.app.Notification.DEFAULT_SOUND;
import static android.app.Notification.DEFAULT_VIBRATE;

/**
 * Created by student on 9/12/17.
 */

public class IBlogFirebaseMessagingService extends com.google.firebase.messaging.FirebaseMessagingService {
    private Bitmap bitmap;

    @Override
    public void onMessageReceived(final RemoteMessage message) {
        super.onMessageReceived(message);

        final Intent emptyIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, emptyIntent, PendingIntent
                .FLAG_UPDATE_CURRENT);
        int id = this.getResources().getIdentifier(message.getData().get("icon"), "drawable", this.getPackageName());
        android.support.v4.app.NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                        .setSmallIcon(id)
                        .setContentTitle("iBlog")
                        .setContentText("iBlog")
                        .setPriority(10)
                        .setAutoCancel(true)
                        .setDefaults(DEFAULT_SOUND | DEFAULT_VIBRATE)
                        .setContentIntent(pendingIntent);

        Date currentTime = Calendar.getInstance().getTime();
        final RemoteViews mContentView = new RemoteViews(getPackageName(), R.layout.notification_layout);
        mContentView.setImageViewResource(R.id.notification_icon, id);
        mContentView.setTextViewText(R.id.notification_time, currentTime.toString());
        mContentView.setTextViewText(R.id.notification_name, message.getData().get("name"));
        mContentView.setTextViewText(R.id.notification_text, message.getData().get("title"));
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReference().child(message.getData()
                .get("image"));

        final long ONE_MEGABYTE = 1024 * 1024;
        storageRef.getBytes(ONE_MEGABYTE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
            @Override
            public void onSuccess(byte[] bytes) {
                bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                System.out.println("======================>" + bitmap.getByteCount());
                mContentView.setImageViewBitmap(R.id.notification_photo, Bitmap.createScaledBitmap(bitmap, 50, 50, false));

            }
        });




        mBuilder.setContent(mContentView);

        NotificationCompat.InboxStyle inboxStyle = new NotificationCompat.InboxStyle();
        inboxStyle.setBigContentTitle("Event tracker details:");
        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        manager.notify(0, mBuilder.build());
    }
    public Bitmap getBitmapFromURL(String strURL) {

        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReference().child(strURL);

        final long ONE_MEGABYTE = 1024 * 1024;
        storageRef.getBytes(ONE_MEGABYTE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
            @Override
            public void onSuccess(byte[] bytes) {
                bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                System.out.println("======================>" + bitmap.getByteCount());
            }
        });
        System.out.println("======================>" + bitmap.getByteCount());
        return bitmap;
    }

    private Bitmap getCircleBitmap(Bitmap bitmap) {
        final Bitmap output = Bitmap.createBitmap(bitmap.getWidth(),
                bitmap.getHeight(), Bitmap.Config.ARGB_8888);
        final Canvas canvas = new Canvas(output);

        final int color = Color.RED;
        final Paint paint = new Paint();
        final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
        final RectF rectF = new RectF(rect);

        paint.setAntiAlias(true);
        canvas.drawARGB(0, 0, 0, 0);
        paint.setColor(color);
        canvas.drawOval(rectF, paint);
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
        canvas.drawBitmap(bitmap, rect, rect, paint);
        bitmap.recycle();

        return output;
    }


}