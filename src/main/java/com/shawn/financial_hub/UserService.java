package com.shawn.financial_hub;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void registerUser(User newUser) {
        if (userRepo.findByUserName(newUser.getUserName()) != null) {
            throw new RuntimeException("Username" + newUser.getUserName() + " is taken.");
        } else {
            saveUser(newUser);
        }
    }

    public void login(User existingUser) {
        if (userRepo.findByUserName(existingUser.getUserName()) and userRepo.findByPassWord(existingUser.getPassword())){
            
        }
    }

}
