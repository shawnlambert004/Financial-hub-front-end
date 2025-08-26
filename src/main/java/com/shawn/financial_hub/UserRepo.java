package com.shawn.financial_hub;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepo
                extends JpaRepository<User, Long> {
        User findByUserName(String userName);

        User findByPassWord(String passWord);
}
// UserRepo