package com.shawn.financial_hub;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.shawn.financial_hub.*;

@Service
public class FeedService {
    @Autowired
    FeedRepo feedRepo;
    User user;
    Feed feed;
    
    public void saveUrl (User user, String url){
        feed.setUrl(url);
        feed.setUser(user);
        feedRepo.save(feed);
    }

    public void deleteUrl(String url) {
        Feed existingFeed = feedRepo.findByUrl(url)
        if (existingFeed != null) {
            feedRepo.deleteById(existingFeed.getId());
        }
    }

    public void addUrl (String url, User user){
        if (feedRepo.findByUrl(url) != null) {
            throw new RuntimeException("url already added");
        }
        else {
            saveUrl(user, url);
        }
    }
    
}