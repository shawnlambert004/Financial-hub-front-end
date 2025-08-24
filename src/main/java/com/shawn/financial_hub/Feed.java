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

    public String getUrl() {
        return url;
    };

    public void setUrl(String url) {
        this.url = url;
    };

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
