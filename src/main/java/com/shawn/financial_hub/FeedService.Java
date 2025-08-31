package com.shawn.financial_hub;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.shawn.financial_hub.*;

@Service
public class FeedService {
    @Autowired
    FeedRepo feedRepo;

    public void saveUrl(User user, String url) {
        Feed feed = new Feed();
        feed.setUrl(url);
        feed.setUser(user);
        feedRepo.save(feed);
    }

    public void deleteUrl(String url) {
        Feed existingFeed = feedRepo.findByUrl(url);
        if (existingFeed != null) {
            feedRepo.deleteById(existingFeed.getId());
        }
    }

    public void addUrl(String url, User user) {
        Feed exFeed = feedRepo.findByUrl(url);
        if (exFeed != null) {
            throw new RuntimeException("url already added");
        } else {
            saveUrl(user, url);
        }
    }

}
// FeedService