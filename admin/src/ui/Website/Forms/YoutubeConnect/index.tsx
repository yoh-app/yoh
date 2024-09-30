import React, { useState } from 'react';
import Script from 'next/script';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

const YoutubeConnect = ({
  action,
  register,
  errors,
  handleSubmit,
  setValue,
  getValues,
  watch,
  data,
}) => {
  const theme = useTheme();
  const { t } = useTranslation('admin');

  const callYTMyList = (token: string) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
        part: "snippet",
        // forHandle: "@xxx"
        // mine: "true",
        forMine: 'true',
        type: 'video'
      })}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log("callYTChannelList", myJson);
      });
  };

  const loginGoogleUser = () => {
    // https://stackoverflow.com/questions/77105875/fedcm-get-rejects-with-networkerror-error-retrieving-a-token
    // https://developers.google.com/identity/protocols/oauth2/scopes
    const gsi = (window as any).google;
    if (gsi) {
      const client = gsi.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        // redirect_uri: "https://dashboard.yoh.app",
        redirect_uri: "https://e887-1-160-68-125.ngrok-free.app",
        response_type: "code",
        scope: "https://www.googleapis.com/auth/youtube.readonly",
        callback: (tokenResponse: any) => {
          console.log("tokenResponse", tokenResponse);
          if (tokenResponse && tokenResponse.access_token) {
            if (
              gsi.accounts.oauth2.hasGrantedAnyScope(
                tokenResponse,
                "https://www.googleapis.com/auth/youtube.readonly"
              )
            ) {
              callYTMyList(tokenResponse.access_token);
            }
          }
        },
      });
      client.requestAccessToken();
    }
  };

  return (
    <div>
      <div className="p-2">
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
          onLoad={() => {
            // initGsiScope();
          }}
        />
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          // style={{ borderColor: theme.palette.grey[700] }}
          onClick={async () => {
            await loginGoogleUser();
          }}
        >
          {t('connectYoutube')}
        </Button>
      </div>
    </div>
  );
};

export default {
  custom: true,
  hideOn: null,
  disableOn: null,
  component: YoutubeConnect,
  intl: {
    titleId: '_Admin.Website._PageGroup.Website._Page.Website._Form.YoutubeConnect._Title',
    title: 'YoutubeConnect',
    descriptionId:
      '_Admin.Website._PageGroup.Website._Page.Website._Form.YoutubeConnect._Description',
    description: 'YoutubeConnect Description',
  },
  order: 13,
};
