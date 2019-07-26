/* globals fetch */

import { COMPONENT_ID, COMPONENT_SECRET } from './api'
import { encode as btoa } from 'base-64'
//import { showError } from './misc'
/*
"COMPONENT_AUTH_BASE_URL":"https://int.virginvoyages.com/svc/identityaccessmanagement-service/",
"CONFIGURATION_BASE_URL":"https://int.virginvoyages.com/svc/configuration-service/",
"DXP_BASE_URL":"https://int.virginvoyages.com/svc"
*/
export const fetchApplicationAccessToken = async () => {
  try {
    const response = await fetch(
      `https://int.virginvoyages.com/svc/identityaccessmanagement-service/oauth/token?grant_type=client_credentials`,
      {
        method: 'post',
        headers: {
          Authorization: `Basic ${btoa(`${COMPONENT_ID}:${COMPONENT_SECRET}`)}`
        }
      }
    )

    if (response.ok) {
      let result = await response.json()
      return result.access_token
    } else {
      console.log('fetchAccessToken'+ response)
      return null
    }
  } catch (error) {
    console.log('fetchApplicationAccessToken'+ error)
  }
}

export const fetchConfigurations = async (accessToken) => {
  try {
    const response = await fetch(
      `https://int.virginvoyages.com/svc/configuration-service/componentSettings?componentId=${COMPONENT_ID}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `application/json`
        }
      }
    )
    if (response.ok) {
      let result = await response.json()
      return result
    } else {
      console.log('fetchConfigurations'+response)
      return null
    }
  } catch (error) {
    console.log('fetchConfigurations'+ error)
  }
}
