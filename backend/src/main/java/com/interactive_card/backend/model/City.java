package com.interactive_card.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "cities")
@Data
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int population;

    private String region;

    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point geom;
}