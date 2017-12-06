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
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.itc.iblog.activities.ProfileActivity;
import com.squareup.picasso.Picasso;
import com.itc.iblog.R;
import com.itc.iblog.models.UserModel;
import java.util.ArrayList;


public class FollowersAdapter extends RecyclerView.Adapter<FollowersAdapter.ViewHolder>{
    private ArrayList<UserModel> mItems;
    private ArrayList<String> mKeys;

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private TextView textViewName;
        private TextView textViewAge;
        private TextView textViewEmail;
        private ImageView imageView;
        private CardView cardView;



        public ViewHolder(View view) {
            super(view);
            textViewName = (TextView) view.findViewById(R.id.textview_name);
            textViewAge = (TextView) view.findViewById(R.id.textview_age);
            imageView = (ImageView) view.findViewById(R.id.user_image);
            textViewEmail = (TextView) view.findViewById(R.id.textview_email);
            cardView = (CardView) view.findViewById(R.id.card_view);
        }
    }

    public FollowersAdapter(Query query, @Nullable ArrayList<UserModel> items,
                       @Nullable ArrayList<String> keys) {
        this.mItems = items;
        this.mKeys = keys;
        query.addChildEventListener(mListener);

    }

     public FollowersAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.user_card, parent, false);
         return new FollowersAdapter.ViewHolder(view);
    }

    @Override
    public int getItemCount() {
        return (mItems != null) ? mItems.size() : 0;
    }

    @Override
     public void onBindViewHolder(final FollowersAdapter.ViewHolder holder, final int position) {
        final UserModel item = mItems.get(position);
        String key = mKeys.get(position);
        item.setUID(key);
        holder.textViewAge.setText(String.valueOf(item.getAge()) + " years old");

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

        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Context context = holder.cardView.getContext();
                String carrentKey = mItems.get(position).getUID();
                Intent intent = new Intent(context, ProfileActivity.class);
                intent.putExtra("key",carrentKey);
                context.startActivity(intent);
            }
        });

    }



    private ChildEventListener mListener = new ChildEventListener() {
        String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        @Override
        public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {
            String key = dataSnapshot.getKey();

            if (!mKeys.contains(key)) {
                UserModel item = dataSnapshot.getValue(UserModel.class);
                if (item.getFollowers() != null) {
                    int insertedPosition;
                    if (item.getFollowers().containsKey(userId)) {
                        if (previousChildName == null) {
                            mItems.add(0, item);
                            mKeys.add(0, key);
                            insertedPosition = 0;
                        } else {
                            int previousIndex = mKeys.indexOf(previousChildName);
                            int nextIndex = previousIndex + 1;
                            if (nextIndex == mItems.size()) {
                                mItems.add(item);
                                mKeys.add(key);
                            } else {
                                mItems.add(nextIndex, item);
                                mKeys.add(nextIndex, key);
                            }
                            insertedPosition = nextIndex;
                        }
                        notifyItemInserted(insertedPosition);
                    }
                }
            }
        }

        @Override
        public void onChildChanged(DataSnapshot dataSnapshot, String s) {
            String key = dataSnapshot.getKey();
            if (mKeys.contains(key)) {
                int index = mKeys.indexOf(key);
                UserModel oldItem = mItems.get(index);
                UserModel newItem = dataSnapshot.getValue(UserModel.class);
                if (newItem.getFollowers().containsKey(userId)) {
                    mItems.set(index, newItem);
                    notifyItemChanged(index);
                } else {
                    mKeys.remove(index);
                    mItems.remove(index);
                    notifyItemRemoved(index);
                }
            }
        }

        @Override
        public void onChildRemoved(DataSnapshot dataSnapshot) {
            String key = dataSnapshot.getKey();

            if (mKeys.contains(key)) {
                int index = mKeys.indexOf(key);
                UserModel item = mItems.get(index);
                mKeys.remove(index);
                mItems.remove(index);
                notifyItemRemoved(index);
            }
        }

        @Override
        public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {
            String key = dataSnapshot.getKey();

            int index = mKeys.indexOf(key);
            UserModel item = dataSnapshot.getValue(UserModel.class);
            mItems.remove(index);
            mKeys.remove(index);
            int newPosition;
            if (previousChildName == null) {
                mItems.add(0, item);
                mKeys.add(0, key);
                newPosition = 0;
            } else {
                int previousIndex = mKeys.indexOf(previousChildName);
                int nextIndex = previousIndex + 1;
                if (nextIndex == mItems.size()) {
                    mItems.add(item);
                    mKeys.add(key);
                } else {
                    mItems.add(nextIndex, item);
                    mKeys.add(nextIndex, key);
                }
                newPosition = nextIndex;
            }
            notifyItemMoved(index, newPosition);
        }

        @Override
        public void onCancelled(DatabaseError databaseError) {

        }

    };

}
