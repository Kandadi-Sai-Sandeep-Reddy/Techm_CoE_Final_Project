package com.example.grocery.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Size {
    private String name;
    private String quantity;

    public Size() {}

    public Size(String name, String quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
