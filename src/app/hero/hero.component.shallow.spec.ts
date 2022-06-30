import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroComponent',()=>{
    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            
        });
        fixture = TestBed.createComponent(HeroComponent);
        
    });

    it('should have the correct hero',()=>{
        fixture.componentInstance.hero = {
            id:1,
            name:'danish',
            strength:20
        }
        fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('danish')
    })

    it('should render the hero name in the anchor tag',()=>{
        fixture.componentInstance.hero = {
            id:1,
            name:'danish',
            strength:20
        }
        fixture.detectChanges();



        expect(fixture.nativeElement.querySelector('a').textContent).toContain('danish')
    })

    // it('should call #onDeleteClick',()=>{
    //     let event ={stopPropagation:()=>{}};
    //     spyOn(fixture.componentInstance,'onDeleteClick');
       

    //     fixture.componentInstance.onDeleteClick(event)

      
    //     expect(fixture.componentInstance.onDeleteClick).toHaveBeenCalledWith(event)

    // })
    // it('should raise delete event emitter on #onDeleteClick',()=>{
    //     let event ={stopPropagation:()=>{}};
    //     spyOn(fixture.componentInstance.delete,'emit');
        
        
    //      fixture.componentInstance.delete.emit()
         
        
    //      expect(fixture.componentInstance.delete.emit).toHaveBeenCalled()

    // })

    it('should call #onDeleteClick',()=>{
        const event = {
            stopPropagation:()=>{}
        }
        spyOn(fixture.componentInstance,'onDeleteClick');

        fixture.componentInstance.onDeleteClick(event);

        expect(fixture.componentInstance.onDeleteClick).toHaveBeenCalledWith(event);
    })
    
it(`should emit deleteEmitter
when onDeleteClick button is clicked (correct)
`,()=>{
    const event = {
        stopPropagation:()=>{}
    }
 const spyEMit=spyOn(fixture.componentInstance.delete,'next')

fixture.debugElement.query(By.css('button'))
.triggerEventHandler('click',{stopPropagation:()=>{}});

//fixture.detectChanges()
//fixture.componentInstance.onDeleteClick(event)

expect(spyEMit).toHaveBeenCalledWith()

})


})