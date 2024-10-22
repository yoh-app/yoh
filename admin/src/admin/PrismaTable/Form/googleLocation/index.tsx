import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
// import { GoogleMapLocation } from '@/types';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { SpinnerLoader } from './ui/loaders/spinner/spinner';
import { MapPin } from './icons/map-pin';

const libraries: any = ['places'];

export default function GooglePlacesAutocomplete({
  onChange,
  data,
  disabled = false,
}: {
  onChange?: any;
  data?: any;
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google_map_autocomplete',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(
    autocompleteInstance: any
  ) {
    setAutocomplete(autocompleteInstance);
  },
    []);

  const onUnmount = React.useCallback(function callback() {
    setAutocomplete(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }
    const location: any = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case 'postal_code': {
          location['zip'] = component.long_name;
          break;
        }

        case 'postal_code_suffix': {
          location['zip'] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case 'state_name':
          location['street_address'] = component.long_name;
          break;

        case 'route':
          location['street_address'] = component.long_name;
          break;

        case 'sublocality_level_1':
          location['street_address'] = component.long_name;
          break;

        case 'locality':
          location['city'] = component.long_name;
          break;

        case 'administrative_area_level_1': {
          location['state'] = component.short_name;
          break;
        }

        case 'country':
          location['country'] = component.long_name;
          break;
      }
    }
    if (onChange) {
      onChange(location);
    }
  };
  if (loadError) {
    return <div>{t('common:text-map-cant-load')}</div>;
  }
  return isLoaded ? (
    <div className="relative">
      <div className="absolute top-0 left-0 flex h-12 w-10 items-center justify-center text-gray-400">
        <MapPin className="w-[18px]" />
      </div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
        fields={[
          'address_components',
          'geometry.location',
          'formatted_address',
        ]}
        types={['address']}
      >
        <input
          type="text"
          placeholder={t('common:placeholder-search-location')}
          defaultValue={data?.formattedAddress!}
          className={`rtl::pr-9 flex h-12 w-full appearance-none items-center rounded border border-border-base text-sm text-heading transition duration-300 ease-in-out focus:border-accent focus:outline-0 focus:ring-0 ltr:pr-4 ltr:pl-9 rtl:pl-4 ${disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : ''
            }`}
          disabled={disabled}
        />
      </Autocomplete>
    </div>
  ) : (
    <SpinnerLoader />
  );
}
