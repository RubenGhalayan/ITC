package com.itc.iblog.fragments;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.itc.iblog.R;
import com.itc.iblog.adapters.FollowersAdapter;
import com.itc.iblog.models.UserModel;

import org.parceler.Parcels;

import java.util.ArrayList;

public class FollowersFragment extends Fragment {
    private final static String SAVED_ADAPTER_ITEMS = "SAVED_ADAPTER_ITEMS";
    private final static String SAVED_ADAPTER_KEYS = "SAVED_ADAPTER_KEYS";
    private FollowersAdapter mMyAdapter;
    private ArrayList<UserModel> mAdapterItems;
    private ArrayList<String> mAdapterKeys;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_followers, container, false);
        handleInstanceState(savedInstanceState);
        Query query = setupFirebase();
        setupRecyclerview(view, query);
        setupData();
        return view;
    }

    private void setupData () {

    }

    private void handleInstanceState(Bundle savedInstanceState) {
        if (savedInstanceState != null &&
                savedInstanceState.containsKey(SAVED_ADAPTER_ITEMS) &&
                savedInstanceState.containsKey(SAVED_ADAPTER_KEYS)) {
            mAdapterItems = Parcels.unwrap(savedInstanceState.getParcelable(SAVED_ADAPTER_ITEMS));
            mAdapterKeys = savedInstanceState.getStringArrayList(SAVED_ADAPTER_KEYS);
        } else {
            mAdapterItems = new ArrayList<>();
            mAdapterKeys = new ArrayList<>();
        }
    }

    private Query setupFirebase() {
        Query query = FirebaseDatabase.getInstance().getReference("Users");
        return query;
    }


    private void setupRecyclerview(View view, Query query) {
        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.recyclerview_followers);
        mMyAdapter = new FollowersAdapter(query, mAdapterItems, mAdapterKeys);
        recyclerView.setLayoutManager(new LinearLayoutManager(view.getContext()));
        recyclerView.setAdapter(mMyAdapter);
    }

}

