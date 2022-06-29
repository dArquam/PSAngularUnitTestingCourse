

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"
import{HeroComponent} from '../hero/hero.component'

describe('HeroesComponent (deep tests )',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    let component;
beforeEach(()=>{
    mockHeroService= jasmine.createSpyObj([
        'getHeroes',
        'addHero',
        'deleteHero'

    ])
    HEROES=[
        {id:2,name:'danish',strength:8},
        {id:1,name:'arqam',strength:20}
    ]
    TestBed.configureTestingModule({
        declarations:[HeroesComponent,
    HeroComponent
        ],
        providers:[{
            provide:HeroService,useValue:mockHeroService
        }],
        
    });
    fixture = TestBed.createComponent(HeroesComponent);
    
})
it('should set heroes',()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(2)
})
it(`should call heroService.deleteHero
when Hero Component's delete button is clicked
`,()=>{
    spyOn(fixture.componentInstance,'delete')
mockHeroService.getHeroes.and.returnValue(of(HEROES));
fixture.detectChanges();

const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

heroComponentDEs[0].query(By.css('button'))
.triggerEventHandler('click',{stopPropagation:()=>{}});


 expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])

})

xit('should call add hero',()=>{
    spyOn(fixture.componentInstance,'add');
    const HERO={
        id:1,
        name:'hero',
        strength:20
    }
    mockHeroService.addHero.and.returnValue(of(HERO));
    fixture.componentInstance.heroes = HEROES;

    fixture.debugElement.query(By.css('button'))
    .triggerEventHandler('click','hero');


    expect(fixture.componentInstance.heroes.length).toBe(2)



})



})