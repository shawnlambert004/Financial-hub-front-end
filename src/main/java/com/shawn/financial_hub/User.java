package com.shawn.financial_hub;

import jakarta.persistence.*;

@Entity
@Table(name = "application_users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String passWord;

    public User() {

    };

    public String get_first_name() {
        return first_name;
    };

    public void set_first_name(String first_name) {
        this.first_name = first_name;
    };

    public String get_last_name() {
        return last_name;
    };

    public void set_last_name(String last_name) {
        this.last_name = last_name;
    };

    public String getUserName() {
        return userName;
    };

    public void set_user_name(String userName) {
        this.userName = userName;
    };

    public String getPassword() {
        return passWord;
    };

    public void set_password(String passWord) {
        this.passWord = passWord;
    };

    public Long get_id() {
        return id;
    };

    public void set_id(Long id) {
        this.id = id;
    }

}