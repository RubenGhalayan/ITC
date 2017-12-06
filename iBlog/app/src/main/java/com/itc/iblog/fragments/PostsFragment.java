package com.itc.iblog.fragments;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;
import com.itc.iblog.adapters.ListAdapter;
import com.itc.iblog.models.CommentModel;
import com.itc.iblog.models.PostModel;
import com.itc.iblog.services.RequestService;
import com.itc.iblog.utils.HelperClass;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class PostsFragment extends Fragment {

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Activity main;
    private List<PostModel> myDataset;
    private String postId;
    private Bitmap bitmap;
    private Uri file;
    private int IMAGE;
    private DatabaseReference ref;
    private ValueEventListener listener;
    private HelperClass help = new HelperClass();
    private Intent serviceIntent;
    private Context context;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.fragment_posts, container, false);
        final FloatingActionButton fab = (FloatingActionButton) view.findViewById(R.id.fab);
        fabClickListener(fab);
        myDataset = new ArrayList<>();
        serviceIntent = new Intent(view.getContext(), RequestService.class);
        context = view.getContext();

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        ref = database.getReference("Posts");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                myDataset = new ArrayList<>();
                for (DataSnapshot messageSnapshot : dataSnapshot.getChildren()) {
                    final PostModel post = messageSnapshot.getValue(PostModel.class);
                    myDataset.add(post);
                }
                mRecyclerView = (RecyclerView) view.findViewById(R.id.my_recycler_view);
                mRecyclerView.setHasFixedSize(true);
                mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
                    @Override
                    public void onScrolled(RecyclerView mRecyclerView, int dx, int dy) {
                        if (dy > 0 || dy < 0 && fab != null && fab.isShown()) {
                            fab.hide();
                        }
                    }

                    @Override
                    public void onScrollStateChanged(RecyclerView mRecyclerView, int newState) {
                        if (newState == RecyclerView.SCROLL_STATE_IDLE) {
                            fab.show();
                        }
                        super.onScrollStateChanged(mRecyclerView, newState);
                    }
                });


                // use a linear layout manager
                mLayoutManager = new LinearLayoutManager(getActivity());
                mRecyclerView.setLayoutManager(mLayoutManager);

                // specify an adapter (see also next example)

                System.out.println("bla " + help.getInstance(getActivity()));
                mAdapter = new ListAdapter(myDataset);

                mRecyclerView.setAdapter(mAdapter);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                System.out.println("The read failed: " + databaseError.getCode());
            }
        });
        return view;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == IMAGE && resultCode == getActivity().RESULT_OK && data != null && data.getData() != null) {
            file = data.getData();

            try {
                bitmap = MediaStore.Images.Media.getBitmap(getActivity().getContentResolver(), file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void uploadImage() {
        if (file != null) {
            FirebaseStorage storage = FirebaseStorage.getInstance();
            StorageReference reference = storage.getReference();
            StorageReference imagesRef = reference.child("Posts").child(postId).child("image");
            UploadTask uploadTask = imagesRef.putFile(file);
            uploadTask.addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    Toast.makeText(getActivity(), "Error : " + e.toString(), Toast.LENGTH_SHORT).show();
                }
            }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                    Toast.makeText(getActivity(), R.string.upload_done, Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            // Toast.makeText(getActivity(), "file is null", Toast.LENGTH_SHORT).show();
        }
        file = null;
        IMAGE = IMAGE + 1;
    }

    private void fabClickListener(FloatingActionButton fab) {
        final Context context = getContext();
        DisplayMetrics metrics = getResources().getDisplayMetrics();
        int width = metrics.widthPixels;
        int height = metrics.heightPixels;
        final Dialog dialog = new Dialog(context);
        dialog.setContentView(R.layout.dialog);
        dialog.getWindow().setLayout(width, height);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {
                Button dialogButtonOk = (Button) dialog.findViewById(R.id.dialogButtonOK);
                dialogButtonOk.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        EditText addTitle = dialog.findViewById(R.id.add_post_title);
                        String title = addTitle.getText().toString();

                        EditText addText = dialog.findViewById(R.id.add_post_text);
                        String text = addText.getText().toString();

                        final FirebaseDatabase database = FirebaseDatabase.getInstance();
                        DatabaseReference ref = database.getReference("Posts");
                        postId = ((MainActivity) getActivity()).getUserName().getText().toString() + new Date().toString();
                        ArrayList<String> users = new ArrayList<String>();
                        users.add("");
                        ArrayList<CommentModel> comments = new ArrayList<CommentModel>();
                        comments.add(null);
                        String postImagePath;
                        if (file != null) {
                            postImagePath = file.toString();
                        } else {
                            postImagePath = null;
                        }
                        sendNotification();
                        ref.child(postId)
                                .setValue(new PostModel(((MainActivity) getActivity()).getUserName().getText().toString(), ((MainActivity) getActivity()).getEmail().getText().toString(),
                                        ((MainActivity) getActivity()).getAvatarUrl(), postImagePath, new Date(), postId, title, text, 0, 0, 0, users, comments, ((MainActivity) getActivity()).getUuid()));
                        uploadImage();
                        Toast.makeText(getContext(), R.string.post_successfuly_added, Toast.LENGTH_SHORT).show();
                        EditText postTitle = dialog.findViewById(R.id.add_post_title);
                        postTitle.setText("");
                        EditText postText = dialog.findViewById(R.id.add_post_text);
                        postText.setText("");
                        dialog.dismiss();
                    }
                });
                Button dialogButtonCancel = (Button) dialog.findViewById(R.id.dialogButtonCencel);
                dialogButtonCancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        EditText postTitle = dialog.findViewById(R.id.add_post_title);
                        postTitle.setText("");
                        EditText postText = dialog.findViewById(R.id.add_post_text);
                        postText.setText("");
                        dialog.dismiss();
                    }
                });

                Button addPostImage = (Button) dialog.findViewById(R.id.add_post_image);
                addPostImage.setOnClickListener(new View.OnClickListener() {


                    @Override
                    public void onClick(View view) {
                        Intent intent = new Intent();
                        intent.setType("image/*");
                        intent.setAction(Intent.ACTION_GET_CONTENT);
                        startActivityForResult(Intent.createChooser(intent, "Select Picture"), IMAGE);
                    }
                });

                dialog.show();
            }
        });
//        ref.removeEventListener(listener);
    }

    @Override
    public void onPause() {
        super.onPause();
        //ref.removeEventListener(listener);
    }

    @Override
    public void onResume() {
        super.onResume();
        //ref.removeEventListener(listener);
    }

    private void sendNotification() {
        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        final DatabaseReference reference = database.getReference("Users").child(userId).child("following");
        reference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot postSnapshot: dataSnapshot.getChildren()) {
                    String post = (String) postSnapshot.getKey();
                    serviceIntent.putExtra("title", "added new post");
                    serviceIntent.putExtra("name", ((MainActivity) getActivity()).getUserName().getText().toString());
                    serviceIntent.putExtra("image", ((MainActivity) getActivity()).getAvatarUrl());
                    serviceIntent.putExtra("icon", "post");
                    serviceIntent.putExtra("id", post);
                    context.startService(serviceIntent);

                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

//        for (String uuid: followingList) {
//            serviceIntent.putExtra("title", "added your post");
//            serviceIntent.putExtra("name", userName);
//            serviceIntent.putExtra("image", "");
//            serviceIntent.putExtra("icon", "ic_action_like.png");
//            serviceIntent.putExtra("id", uuid);
//            System.out.println("uuid  --------  " + uuid);
//            context.startService(serviceIntent);
//        }
    }
}


