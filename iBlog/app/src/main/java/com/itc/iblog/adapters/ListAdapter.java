package com.itc.iblog.adapters;


import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
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
import com.google.firebase.database.GenericTypeIndicator;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.itc.iblog.R;
import com.itc.iblog.fragments.PostCommentsFragment;
import com.itc.iblog.models.PostModel;
import com.itc.iblog.services.RequestService;
import com.itc.iblog.utils.HelperClass;

import java.util.ArrayList;
import java.util.List;

public class ListAdapter extends RecyclerView.Adapter<ListAdapter.MyViewHolder> {

    private List<PostModel> cardList;
    private String email;
    private String userName;
    private String url;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView userName;
        public TextView userSurname;
        public TextView postTime;
        public ImageView userImage;
        public ImageView postImage;
        public TextView postTitle;
        public TextView postText;
        public TextView likeCount;
        public TextView favCount;
        public CardView cardView;
        public TextView commentCount;
        public ImageView likeButton;
        public ImageView favButton;
        public ImageView comButton;

        public MyViewHolder(View view) {
            super(view);
            userName = (TextView) view.findViewById(R.id.user_name);
            userSurname = (TextView) view.findViewById(R.id.user_surname);
            userImage = (ImageView) view.findViewById(R.id.user_image);
            postTime = (TextView) view.findViewById(R.id.post_time);
            postImage = (ImageView) view.findViewById(R.id.post_image);
            postTitle = (TextView) view.findViewById(R.id.post_title);
            postText = (TextView) view.findViewById(R.id.post_text);
            likeCount = (TextView) view.findViewById(R.id.like_count);
            likeButton = (ImageView) view.findViewById(R.id.like);
            commentCount = (TextView) view.findViewById(R.id.comment_count);
            cardView = (CardView) view.findViewById(R.id.card_view);
            favButton = (ImageView) view.findViewById(R.id.favorite);
            favCount = (TextView) view.findViewById(R.id.favorite_count);
            comButton = (ImageView) view.findViewById(R.id.comment);

        }
    }

    public ListAdapter(List<PostModel> cardList) {
        this.cardList = cardList;

    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.single_card, parent, false);
        return new MyViewHolder(itemView);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {
        final PostModel post = cardList.get(position);
        holder.userName.setText(post.getUserName());
        holder.userSurname.setText(post.getUserEmail());
        holder.postTime.setText(post.getPostTime().toString().substring(0, 19));
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReference();
        StorageReference pathReference = storageRef.child(post.getUserImage());

        final long ONE_MEGABYTE = 1024 * 1024;
        pathReference.getBytes(ONE_MEGABYTE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
            @Override
            public void onSuccess(byte[] bytes) {
                Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
                if (bmp.equals(null)) {

                }
                holder.userImage.setImageBitmap(Bitmap.createScaledBitmap(bmp, 120, 120, false));
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception exception) {
                System.out.println("Image not found.");
            }
        });
        holder.postTitle.setText(post.getPostTitle());
        holder.postText.setText(post.getPostText());


        if (post.getPostImagePath() != null) {
            Bitmap bitmap = HelperClass.loadImage(post);
            if (bitmap != null) {
                holder.postImage.setImageBitmap(bitmap);
                holder.postImage.setVisibility(View.VISIBLE);

            } else {
                holder.postImage.setVisibility(View.GONE);
            }
        } else {
            holder.postImage.setVisibility(View.GONE);
        }
        holder.likeCount.setText(post.getLikeCount().toString());



        DatabaseReference mDatabase = FirebaseDatabase.getInstance().getReference();
        DatabaseReference dbRef = mDatabase.child("Users");
        dbRef.child(FirebaseAuth.getInstance().getCurrentUser().getUid()).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                email = (String) dataSnapshot.child("email").getValue();
                userName = (String) dataSnapshot.child("userName").getValue();
                url = (String) dataSnapshot.child("url").getValue();
                if (post.getUsers().indexOf(email) >= 0) {
                    holder.likeButton.setBackgroundResource(0);
                    holder.likeButton.setImageResource(R.drawable.ic_action_liked);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });


        holder.likeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (post.getUsers().indexOf(email) < 0) {
                    Integer newLikeCount = Integer.parseInt(String.valueOf(post.getLikeCount())) + 1;
                    final FirebaseDatabase database = FirebaseDatabase.getInstance();
                    final DatabaseReference ref = database.getReference("Posts");
                    ref.child(post.getPostId()).child("likeCount").setValue(newLikeCount);
                    ArrayList<String> users = post.getUsers();
                    users.add(email);
                    Intent serviceIntent = new Intent(view.getContext(), RequestService.class);
                    serviceIntent.putExtra("title", "liked your post");
                    serviceIntent.putExtra("name", userName);
                    serviceIntent.putExtra("image", post.getUserImage());
                    serviceIntent.putExtra("icon", "ic_action_like");
                    serviceIntent.putExtra("id", post.getUuid());
                    view.getContext().startService(serviceIntent);
                    holder.likeCount.setText(newLikeCount.toString());
                    ref.child(post.getPostId()).child("users").setValue(users);
                    holder.likeButton.setBackgroundResource(0);
                    holder.likeButton.setImageResource(R.drawable.ic_action_liked);

                }
            }
        });
        Integer comCount = 0;
        if (post.getComments() != null) {
            comCount = post.getComments().size();
        }
        holder.commentCount.setText(comCount.toString());
        holder.comButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                android.support.v4.app.Fragment fragment = new PostCommentsFragment(post, userName, email,url);
                FragmentManager fm = ((FragmentActivity) view.getContext()).getSupportFragmentManager();
                FragmentTransaction transaction = fm.beginTransaction();
                transaction.replace(R.id.contentFragment, fragment);
                transaction.addToBackStack(null);
                transaction.commit();

            }
        });
        holder.favCount.setText(post.getFavCount().toString());

        final ArrayList<String> favPosts = new ArrayList<String>();
        final DatabaseReference db = mDatabase.child("Users");
        db.child(FirebaseAuth.getInstance().getCurrentUser().getUid())
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        final List<String> favPosts;
                        if (dataSnapshot.hasChild("favoritesPosts")) {
                            favPosts = dataSnapshot.child("favoritesPosts").getValue(new GenericTypeIndicator<ArrayList<String>>() {
                            });
                        } else {
                            favPosts = new ArrayList<String>();
                            favPosts.add("");
                        }
                        if (favPosts.indexOf(post.getPostId()) > -1) {
                            holder.favButton.setBackgroundResource(0);
                            holder.favButton.setImageResource(R.drawable.ic_action_faved);
                        } else {
                            holder.favButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    DatabaseReference mDatabase = FirebaseDatabase.getInstance().getReference();
                                    if (favPosts.indexOf(post.getPostId()) == -1) {
                                        favPosts.add(post.getPostId());
                                        db.child(FirebaseAuth.getInstance().getCurrentUser().getUid()).child("favoritesPosts").setValue(favPosts);
                                        Integer newFavCount = Integer.parseInt(String.valueOf(post.getFavCount())) + 1;
                                        final FirebaseDatabase database = FirebaseDatabase.getInstance();
                                        DatabaseReference ref = database.getReference("Posts");
                                        ref.child(post.getPostId()).child("favCount").setValue(newFavCount);
                                        Intent serviceIntent = new Intent(view.getContext(), RequestService.class);
                                        serviceIntent.putExtra("title", "selected your post as favorite");
                                        serviceIntent.putExtra("name", userName);
                                        serviceIntent.putExtra("image", post.getUserImage());
                                        serviceIntent.putExtra("icon", "ic_action_name");
                                        serviceIntent.putExtra("id", post.getUuid());
                                        view.getContext().startService(serviceIntent);
                                        holder.favCount.setText(newFavCount.toString());
                                        holder.favButton.setBackgroundResource(0);
                                        holder.favButton.setImageResource(R.drawable.ic_action_faved);
                                    }
                                }
                            });
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {

                    }
                });

    }

    @Override
    public int getItemCount() {
        return cardList.size();
    }


}
