

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (shallow tests )',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
beforeEach(()=>{
    mockHeroService= jasmine.createSpyObj([
        'getHeroes',
        'addHero',
        'deleteHero'

    ])
    HEROES=[
        {id:2,name:'danish',strength:8}
    ]
    TestBed.configureTestingModule({
        declarations:[HeroesComponent],
        providers:[{
            provide:HeroService,useValue:mockHeroService
        }],
        schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
})

it('should set heroes correctly from service',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges()

    expect(fixture.componentInstance.heroes.length).toBe(1);
});
it('should call getHeroes',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges();
    expect(mockHeroService.getHeroes).toHaveBeenCalled();
})








})