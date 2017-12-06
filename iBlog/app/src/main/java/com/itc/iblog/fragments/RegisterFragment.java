package com.itc.iblog.fragments;


import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.messaging.FirebaseMessaging;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;
import com.itc.iblog.models.UserModel;

public class RegisterFragment extends Fragment{

    private Button buttonRegister;
    private EditText editTextEmailReg;
    private EditText editTextPassReg;
    private EditText editTextConfPassReg;
    private ProgressDialog progressDialog;
    private FirebaseAuth firebaseAuth;
    private EditText editTextSelectedAge;
    private EditText editTextUsername;
    private FirebaseDatabase database;
    private FirebaseUser user;
    private ProgressBar progressBar;

    public RegisterFragment() {
        super();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        firebaseAuth = FirebaseAuth.getInstance();
        progressDialog = new ProgressDialog(getActivity());
        database =  FirebaseDatabase.getInstance();
        user =  firebaseAuth.getCurrentUser();
        // Inflate the layout for this fragment
        final View view = inflater.inflate(R.layout.fragment_register, container, false);
        Animation scale = AnimationUtils.loadAnimation(super.getContext(), R.anim.scale);
        view.setAnimation(scale);
        editTextEmailReg = (EditText) view.findViewById(R.id.emailReg);
        progressBar = (ProgressBar) view.findViewById(R.id.progressBar_cyclic);
        editTextPassReg = (EditText) view.findViewById(R.id.passwordReg);
        editTextConfPassReg = (EditText) view.findViewById(R.id.confirm);
        editTextSelectedAge = (EditText) view.findViewById(R.id.age);
        editTextUsername = (EditText) view.findViewById(R.id.name);
        buttonRegister = (Button) view.findViewById(R.id.buttonRegister);
        buttonRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("register");
                if(v == buttonRegister) {
                    registerUser(view);
                }
            }
        });
        return view;
    }

    public void onStart () {
        super.onStart();
    }

    private void registerUser(View view) {
        final String email = editTextEmailReg.getText().toString().trim();
        String pass = editTextPassReg.getText().toString().trim();
        String passConf = editTextConfPassReg.getText().toString().trim();
        String age = editTextSelectedAge.getText().toString().trim();
        String name = editTextUsername.getText().toString().trim();
        String passPattern = "^(?=.*[0-9])(?=.*[a-z]).{6,}";
        String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

        if(TextUtils.isEmpty(email)) {
            editTextEmailReg.setError(getContext().getString(R.string.email_required));
            return;
        }

        if(!email.matches(emailPattern)) {
            editTextEmailReg.setError(getContext().getString(R.string.invalid_email));
            return;
        }

        if(TextUtils.isEmpty(pass)) {
            editTextPassReg.setError((getContext().getString(R.string.password_required)));
            return;
        }
        if(TextUtils.isEmpty(passConf)) {
            editTextConfPassReg.setError(getContext().getString(R.string.confirm_required));
            return;
        }

        if(TextUtils.isEmpty(age)) {
            editTextSelectedAge.setError(getContext().getString(R.string.age_required));
            return;
        }

        if(TextUtils.isEmpty(name)) {
            editTextUsername.setError(getContext().getString(R.string.name_required));
            return;
        }

        if(!pass.equals(passConf)) {
            editTextConfPassReg.setError(getContext().getString(R.string.password_dont_match));
            return;
        }

        if (!pass.matches(passPattern)) {
            editTextConfPassReg.setError(getContext().getString(R.string.password_dont_match));
        }
        progressBar.setVisibility(View.VISIBLE);
        firebaseAuth.createUserWithEmailAndPassword(email, pass)
                .addOnCompleteListener(getActivity(), new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()) {
                            Toast.makeText(getActivity(),R.string.register_successfully, Toast.LENGTH_SHORT).show();
                            user = firebaseAuth.getCurrentUser();
                            registerUserInfo();
                            Intent intent = new Intent(getActivity(),
                                    MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                            FirebaseMessaging.getInstance().subscribeToTopic(FirebaseAuth.getInstance().getCurrentUser().getUid());
                            startActivity(intent);
                            getActivity().finish();
                        } else {
                            Toast.makeText(getActivity(),R.string.not_register, Toast.LENGTH_SHORT).show();
                        }
                        progressBar.setVisibility(View.INVISIBLE);

                    }
                });
    }

    public void registerUserInfo() {
        String userId = user.getUid();
        UserModel userModel = new UserModel(this.editTextUsername.getText().toString().trim(), this.editTextEmailReg.getText().toString().trim(), Integer.parseInt(this.editTextSelectedAge.getText().toString()));
        DatabaseReference mRef =  database.getReference().child("Users").child(userId);
        mRef.setValue(userModel);
    }
}
