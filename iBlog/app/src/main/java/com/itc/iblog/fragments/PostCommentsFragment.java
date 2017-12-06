package com.itc.iblog.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.widget.NestedScrollView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;
import com.itc.iblog.activities.ProfileActivity;
import com.itc.iblog.adapters.CommentAdapter;
import com.itc.iblog.models.CommentModel;
import com.itc.iblog.models.PostModel;
import com.itc.iblog.services.RequestService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;


public class PostCommentsFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private List<CommentModel> myDataset;
    private DatabaseReference ref;
    private PostModel post;
    private String userName;
    private String email;
    private EditText text;
    private String url;
    private AppBarLayout appBarLayout;
    private NestedScrollView nestedScroll;


    public PostCommentsFragment(PostModel post, String userName, String email,String url) {
        this.post = post;
        this.userName = userName;
        this.email = email;
        this.url = url;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        if (getActivity() instanceof  ProfileActivity) {
            getActivity().findViewById(R.id.floating_avatar).setVisibility(View.GONE);
            appBarLayout = (AppBarLayout) getActivity().findViewById(R.id.app_bar_layout);
            nestedScroll = (NestedScrollView) getActivity().findViewById(R.id.nested_scroll);
            nestedScroll.setNestedScrollingEnabled(false);
            appBarLayout.setExpanded(false, false);
        }
        final View view = inflater.inflate(R.layout.fragment_post_comments, container, false);

        text = (EditText) view.findViewById(R.id.type_comment);
        final FloatingActionButton fab = (FloatingActionButton) view.findViewById(R.id.send);
        fabClickListener(fab);
        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        ref = database.getReference("Posts").child(post.getPostId());

        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.hasChild("comments")) {
                    myDataset = new ArrayList<CommentModel>();
                    for (DataSnapshot commentSnapshot : dataSnapshot.child("comments").getChildren()) {
                        final CommentModel comment = commentSnapshot.getValue(CommentModel.class);
                        if (comment != null) {
                            myDataset.add(comment);
                        }

                    }
                    mRecyclerView = (RecyclerView) view.findViewById(R.id.comment_recycler_view);
                    mRecyclerView.setHasFixedSize(true);
                    mLayoutManager = new LinearLayoutManager(getActivity());
                    mRecyclerView.setLayoutManager(mLayoutManager);

                    // specify an adapter (see also next example)
                    mAdapter = new CommentAdapter(myDataset);
                    mRecyclerView.setAdapter(mAdapter);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                System.out.println("The read failed: " + databaseError.getCode());
            }
        });
        return view;
    }

    private void fabClickListener(FloatingActionButton fab) {
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {
                String commentText = text.getText().toString();
                if (!Objects.equals(commentText, "")) {
                    CommentModel comment;
                    comment = new CommentModel(userName, email, url, new Date(), commentText);
                    text.setText("");
                    if (myDataset == null) {
                        myDataset = new ArrayList<CommentModel>();
                    }
                    myDataset.add(comment);
                    ref.child("comments").setValue(myDataset);
                    if (getActivity() instanceof  MainActivity) {
                        Toast.makeText((MainActivity) getActivity(), "your comment added", Toast.LENGTH_SHORT).show();
                    }else {
                        Toast.makeText((ProfileActivity) getActivity(), "your comment added", Toast.LENGTH_SHORT).show();

                    }
                    Intent serviceIntent = new Intent(view.getContext(), RequestService.class);
                    serviceIntent.putExtra("title", "commented your post");
                    serviceIntent.putExtra("name", userName);
                    serviceIntent.putExtra("image", post.getUserImage());
                    serviceIntent.putExtra("icon", "ic_action_comment");
                    serviceIntent.putExtra("id", post.getUuid());
                    view.getContext().startService(serviceIntent);

                }
            }
        });
    }
}
