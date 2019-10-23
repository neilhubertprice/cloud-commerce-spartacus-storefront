import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';
import { CmsLibModule } from '../cms-components/cms-lib.module';
import { StorefrontConfig } from '../storefront-config';
import { b2cLayoutConfig } from './config/b2c-layout-config';
import { defaultCmsContentConfig } from './config/static-cms-structure/default-cms-content.config';
import { StorefrontModule } from './storefront.module';
import { PLPAccessibilityLayoutConfig } from './config/optional-layouts/plp-accessibility-layout-config';

@NgModule({
  imports: [
    StorefrontModule.withConfig(<StorefrontConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),

    ConfigModule.withConfig(b2cLayoutConfig),

    /**
     * @deprecated since 2.0.0
     * NOTE: remove below PLP accessibility config, move the contents to the main default layout config
     */
    ConfigModule.withConfig(PLPAccessibilityLayoutConfig),

    ConfigModule.withConfigFactory(defaultCmsContentConfig),

    // the cms lib module contains all components that added in the bundle
    CmsLibModule,
  ],
  exports: [StorefrontModule],
})
export class B2cStorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<B2cStorefrontModule> {
    return {
      ngModule: B2cStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
