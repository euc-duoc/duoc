import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage-angular"
import { MountConfig } from "cypress/angular"
import { LoginFormComponent } from "src/app/components/login-form/login-form.component"
import { LoginPageRoutingModule } from "src/app/login/login-routing.module"
import { StorageService } from "src/app/services/storage.service"

const config: MountConfig<LoginFormComponent> = {
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [LoginFormComponent],
  providers: [StorageService]
}

describe('LoginFormComponent.cy.ts', () => {
  it('playground', () => {
    cy.mount(LoginFormComponent, config)
    cy.get('ion-button').click()
    cy.get('ion-col').eq(3).should('contains.text', 'Passwrd')
  })
})