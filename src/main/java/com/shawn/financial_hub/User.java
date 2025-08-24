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

    public String getFirstName() {
        return first_name;
    };

    public void setFirstName(String first_name) {
        this.first_name = first_name;
    };

    public String getLastName() {
        return last_name;
    };

    public void setLastName(String last_name) {
        this.last_name = last_name;
    };

    public String getUserName() {
        return userName;
    };

    public void setUserName(String userName) {
        this.userName = userName;
    };

    public String getPassword() {
        return passWord;
    };

    public void setPassword(String passWord) {
        this.passWord = passWord;
    };

    public Long getId() {
        return id;
    };

    public void setId(Long id) {
        this.id = id;
    }

}