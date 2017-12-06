package com.itc.iblog.fragments;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.itc.iblog.R;
import com.itc.iblog.adapters.AboutUsAdapter;
import com.itc.iblog.models.UserModel;

import java.util.ArrayList;


public class AboutUsFragment extends android.support.v4.app.Fragment {
    private AboutUsAdapter mMyAdapter;
    private ArrayList<UserModel> mAdapterItems;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_about_us, container, false);
        handleInstanceState(savedInstanceState);
        view.findViewById(R.id.itc_tel).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:+37460445500"));
                startActivity(intent);
            }
        });
        setupRecyclerview(view);

        return view;
    }

    private void handleInstanceState(Bundle savedInstanceState) {
        mAdapterItems = new ArrayList<>();
        mAdapterItems.add(new UserModel(getContext().getString(R.string.Nelli), R.drawable.developer_nelli, getContext().getString(R.string.Nelli_mail)));
        mAdapterItems.add(new UserModel(getContext().getString(R.string.Khachik), R.drawable.developer_khachik, getContext().getString(R.string.Khachik_mail)));
        mAdapterItems.add(new UserModel(getContext().getString(R.string.Ruben), R.drawable.developer_ruben, getContext().getString(R.string.Ruben_mail)));
        mAdapterItems.add(new UserModel(getContext().getString(R.string.Liana), R.drawable.developer_liana, getContext().getString(R.string.Liana_mail)));
        mAdapterItems.add(new UserModel(getContext().getString(R.string.Smbat), R.drawable.developer_smbat_d, getContext().getString(R.string.Smbat_mail)));
    }

    private void setupRecyclerview(View view) {
        RecyclerView recyclerView = view.findViewById(R.id.about_us_rv);
        mMyAdapter = new AboutUsAdapter(mAdapterItems);
        recyclerView.setLayoutManager(new LinearLayoutManager(view.getContext()));
        recyclerView.setAdapter(mMyAdapter);
    }
}