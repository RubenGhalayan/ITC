package com.itc.iblog.fragments;


import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.text.TextUtils;
import android.util.Log;
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
import com.google.firebase.messaging.FirebaseMessaging;
import com.itc.iblog.R;
import com.itc.iblog.activities.MainActivity;

public class LoginFragment extends Fragment {
    private FirebaseAuth firebaseAuth;
    private EditText editTextEmail;
    private EditText editTextPass;
    private static final String Tag = "EmailPassword";
    private ProgressBar progressBar;

    public LoginFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_login, container, false);
        Animation scale = AnimationUtils.loadAnimation(super.getContext(), R.anim.scale);
        view.setAnimation(scale);
        firebaseAuth = FirebaseAuth.getInstance();
        Button register = (Button) view.findViewById(R.id.register);
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Fragment fragment = new RegisterFragment();
                FragmentManager fm = getFragmentManager();
                FragmentTransaction transaction = fm.beginTransaction();
                transaction.replace(R.id.contentFragment, fragment);
                transaction.addToBackStack(null).commit();
            }
        });
        editTextEmail = (EditText) view.findViewById(R.id.editText);
        editTextPass = (EditText) view.findViewById(R.id.editText2);
        progressBar = (ProgressBar) view.findViewById(R.id.progressBar_cyclic_login);
        Button login = (Button) view.findViewById(R.id.buttonLogin);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = editTextEmail.getText().toString().trim();
                String password = editTextPass.getText().toString().trim();
                signIn(email, password);
            }
        });
        Button forgot = view.findViewById(R.id.forgot);
        forgot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Fragment fragment = new ForgotPasswordFragment();
                FragmentManager fm = getFragmentManager();
                FragmentTransaction transaction = fm.beginTransaction();
                transaction.replace(R.id.contentFragment, fragment);
                transaction.addToBackStack(null).commit();
            }
        });
        updateUI(firebaseAuth.getCurrentUser());
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
    }

    private void updateUI(FirebaseUser user) {
        if (user != null) {
            Intent intent = new Intent(getActivity(),
                    MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
            startActivity(intent);
            getActivity().finish();
        }
    }

    private void signIn(final String email, String password) {
        if (TextUtils.isEmpty(password)) {
            editTextPass.setError(getContext().getString(R.string.password_required));
            return;
        }

        if (TextUtils.isEmpty(email)) {
            editTextEmail.setError(getContext().getString(R.string.email_required));
            return;
        }
        Log.d(Tag, "signIn:" + email);
        progressBar.setVisibility(View.VISIBLE);
        firebaseAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(getActivity(), new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            Log.d(Tag, "SignInWithEmail:success");
                            Toast.makeText(getActivity(), R.string.login_successfully, Toast.LENGTH_SHORT).show();
                            FirebaseUser user = firebaseAuth.getCurrentUser();
                            FirebaseMessaging.getInstance().subscribeToTopic(FirebaseAuth.getInstance().getCurrentUser().getUid());
                            updateUI(user);
                        } else {
                            Log.w(Tag, "SignInWithEmail:failure", task.getException());
                            Toast.makeText(getActivity(), R.string.faild, Toast.LENGTH_SHORT).show();
                            updateUI(null);
                        }
                        progressBar.setVisibility(View.INVISIBLE);
                    }
                });
    }

}