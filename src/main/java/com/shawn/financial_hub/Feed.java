package com.shawn.financial_hub;

import jakarta.persistence.*;

@Entity
@Table(name = "feed_users")
public class Feed {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Feed() {
    };

    public Long get_id() {
        return id;
    };

    public void set_id(Long id) {
        this.id = id;
    };

    public String get_url() {
        return url;
    };

    public void set_url(String url) {
        this.url = url;
    };

    public User get_user() {
        return user;
    }

    public void set_user(User user) {
        this.user = user;
    }
}
