package com.shawn.financial_hub;

import org.springframework.stereotype.Service;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;
import com.shawn.financial_hub.UserRepo;
import com.shawn.financial_hub.User;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public void saveUser(User newUser) {
        userRepo.save(newUser);
    }

    public User registerUser(User newUser) {
        if (userRepo.findByUserName(newUser.getUserName()) != null) {
            throw new RuntimeException("Username" + newUser.getUserName() + " is taken.");
        } else {
            saveUser(newUser);
            return newUser;
        }
    }

    public User login(String UserName, String Password) {
        User existingUser = userRepo.findByUserName(UserName);
        if (existingUser != null) {
            if (Password.equals(existingUser.getPassword())) {
                return existingUser;
            } else {
                throw new RuntimeException("Incorrect Password");
            }
        } else {
            throw new RuntimeException("User does not Exist");
        }
    }
}
// UserService