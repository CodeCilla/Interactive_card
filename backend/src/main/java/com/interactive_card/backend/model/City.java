package com.interactive_card.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "cities")
@Data
@SqlResultSetMapping(
        name = "CityWithDistanceMapping",
        entities = {
                @EntityResult(
                        entityClass = City.class,
                        fields = {
                                @FieldResult(name = "id", column = "id"),
                                @FieldResult(name = "name", column = "name"),
                                @FieldResult(name = "population", column = "population"),
                                @FieldResult(name = "region", column = "region"),
                                @FieldResult(name = "geom", column = "geom")
                        }
                )
        },
        columns = {
                @ColumnResult(name = "distance", type = Double.class)
        }
)
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int population;
    private String region;

    @Transient
    @JsonProperty("distance")
    private Double distance;

    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point geom;
}