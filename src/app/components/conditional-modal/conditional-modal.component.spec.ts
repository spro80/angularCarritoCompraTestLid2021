import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConditionalModalComponent } from './conditional-modal.component';

describe('CustomerInformationComponent', () => {
  let component: ConditionalModalComponent;
  let fixture: ComponentFixture<ConditionalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalModalComponent],
      imports: [HttpClientModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should onInit', () => {
    expect(component).toBeTruthy();
  });

});
