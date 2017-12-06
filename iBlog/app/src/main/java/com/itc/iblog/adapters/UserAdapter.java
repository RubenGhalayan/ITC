package com.itc.iblog.adapters;


import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;
import com.itc.iblog.activities.ProfileActivity;
import com.itc.iblog.models.UserModel;
import com.itc.iblog.services.RequestService;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;


public class UserAdapter extends FirebaseRecyclerAdapter<UserAdapter.ViewHolder, UserModel> {
    private DatabaseReference mDatabase;
    private Context mContext;

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private TextView textViewName;
        private TextView textViewAge;
        private TextView textViewEmail;
        private ImageView imageView;
        private ImageView follow;
        private CardView cardView;


        public ViewHolder(View view) {
            super(view);
            textViewName = (TextView) view.findViewById(R.id.textview_name);
            textViewAge =  (TextView) view.findViewById(R.id.textview_age);
            imageView =  (ImageView) view.findViewById(R.id.user_image);
            follow = (ImageView)view.findViewById(R.id.follow);
            textViewEmail =  (TextView) view.findViewById(R.id.textview_email);
            cardView = (CardView) view.findViewById(R.id.card_view);
        }
    }

    public UserAdapter(Context context, Query query, @Nullable ArrayList<UserModel> items,
                       @Nullable ArrayList<String> keys) {
        super(query, items, keys);
        mContext = context;
    }

    @Override public UserAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.user_card, parent, false);

        return new ViewHolder(view);
    }


    @Override public void onBindViewHolder(final UserAdapter.ViewHolder holder, final int position) {
        final UserModel item = getItem(position);
        String key = getKeys().get(position);
        item.setUID(key);
        final String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        holder.textViewAge.setText(String.valueOf(item.getAge()) + " years old");


        if (!item.getFollowings().containsKey(userId)) {
            holder.follow.setImageResource(R.drawable.heart);
        } else {
            holder.follow.setImageResource(R.drawable.heart_unfollow);
        }

        FirebaseStorage firebaseStorage = FirebaseStorage.getInstance();
        if (item.getUrl() != null) {
            firebaseStorage.getReference().child(item.getUrl()).getDownloadUrl().addOnSuccessListener
                    (new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri uri) {
                            Picasso.with(holder.imageView.getContext()).load(uri.toString()).into(holder
                                    .imageView);
                        }
                    }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {
                }
            });
        } else {
            holder.imageView.setImageResource(R.drawable.user);
        }

        holder.textViewEmail.setText(item.getEmail());
        holder.textViewName.setText(item.getUserName());

        holder.follow.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                if (item.getFollowings().containsKey(userId)) {
                    removeFollower(item, holder.follow);
                } else {
                    addFollower(item, holder.follow);
                    Intent serviceIntent = new Intent(v.getContext(), RequestService.class);
                    serviceIntent.putExtra("title", "started to follow you");
                    serviceIntent.putExtra("name", ((MainActivity)mContext).getUserName().getText().toString());
                    serviceIntent.putExtra("image", ((MainActivity)mContext).getAvatarUrl());
                    serviceIntent.putExtra("icon", "ic_action_name");
                    serviceIntent.putExtra("id", item.getUID());
                    v.getContext().startService(serviceIntent);
                }
            }
        });

        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Context context = holder.cardView.getContext();
                if (!item.getUID().equals(userId)) {
                    String carrentKey = getKeys().get(position);
                    System.out.println(carrentKey);
                    Intent intent = new Intent(context, ProfileActivity.class);
                    intent.putExtra("key", carrentKey);
                    intent.putExtra("followed", item.getFollowings().containsKey(userId));
                    context.startActivity(intent);
                } else {
                    Intent intent = new Intent(context, ProfileActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                }
            }
        });
    }

    private void addFollower(final UserModel item, final ImageView follow) {
        mDatabase = FirebaseDatabase.getInstance().getReference();
        mDatabase.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
                mDatabase.child("Users").child(userId).child("followers").child(item.getUID()
                ).setValue(true);
                mDatabase.child("Users").child(item.getUID()).child("following").child
                        (userId).setValue(true);
                item.following.put(userId,true);
                // follow.setImageResource(R.drawable.heart_unfollow);
                notifyItemChanged(getItems().indexOf(item));
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    private void removeFollower(final UserModel item, final ImageView follow) {
        final String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        DatabaseReference mDatabase = FirebaseDatabase.getInstance().getReference("Users");
        mDatabase.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                snapshot.child(userId).child("followers").child(item.getUID()).getRef().removeValue();
                snapshot.child(item.getUID()).child("following").child(userId).getRef().removeValue();
                // follow.setImageResource(R.drawable.heart);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    @Override protected void itemAdded(UserModel item, String key, int position) {

        Log.d("UserAdapter", "added");
    }

    @Override protected void itemChanged(UserModel oldItem, UserModel newItem, String key, int
            position) {
        Log.d("UserAdapter", "Changed an item.");
    }

    @Override protected void itemRemoved(UserModel item, String key, int position) {
        Log.d("UserAdapter", "Removed an item from the adapter.");
    }

    @Override protected void itemMoved(UserModel item, String key, int oldPosition, int
            newPosition) {
        Log.d("UserAdapter", "Moved an item.");
    }
}