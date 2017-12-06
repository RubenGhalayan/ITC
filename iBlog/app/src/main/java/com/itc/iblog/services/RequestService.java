package com.itc.iblog.services;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.Nullable;

import android.widget.Toast;

import com.google.gson.Gson;
import com.itc.iblog.models.NotificationData;
import com.itc.iblog.models.PostRequestData;


import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class RequestService extends Service {
    public static final String SERVER_KEY = "AAAA9zVO14U:APA91bGsY0Y8m6GvY4bc1eJ243OtS5stHMcgjw7lcv927MW9ZyGYyfKSwRyo3xrNthLx0LMO4Boi6Kq-bU4oztnUhyJ0vqpW6eTi7eqcNnwrkLB4LvYQdwb6PfiVaxBP2uB-ZFY15g6u";
    private PostRequestData postRequestData;
    private String title;
    private String id;
    private String name;
    private String image;
    private String icon;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Bundle extras = intent.getExtras();
        if(extras == null) {
            this.title = null;
            this.id = null;
            this.name = null;
            this.image = null;
            this.icon = null;
        } else {
            this.title = extras.getString("title");
            this.id = extras.getString("id");
            this.name = extras.getString("name");
            this.image = extras.getString("image");
            this.icon = extras.getString("icon");
        }

        sendNotification();
        return super.onStartCommand(intent, flags, startId);

   }

   private void sendNotification() {
       NotificationData data = new NotificationData();
       data.setTitle(this.title);
       data.setName(this.name);
       data.setImage(this.image);
       data.setIcon(this.icon);
       this.postRequestData = new PostRequestData();
       postRequestData.setTo("/topics/" + id);
       postRequestData.setData(data);
       Gson gson = new Gson();
       String json = gson.toJson(postRequestData);
       String url = "https://fcm.googleapis.com/fcm/send";
       final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
       RequestBody body = RequestBody.create(JSON, json);
       Request request = new Request.Builder()
                .url(url)
                .header("Authorization", "key=" + SERVER_KEY)
                .post(body)
                .build();
       Callback responseCallBack = new Callback() {
            @Override
            public void onFailure(okhttp3.Call call, IOException e) {
                stopSelf();
            }

            @Override
            public void onResponse(okhttp3.Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    throw new IOException("Unexpected code " + response);
                }
                stopSelf();
            }
        };
        OkHttpClient client = new OkHttpClient();
        Call call = client.newCall(request);
        call.enqueue(responseCallBack);

   }
}
