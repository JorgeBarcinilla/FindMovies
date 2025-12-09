/**
 * Environment configuration for production
 */
export const environment = {
  /**
   * API base URL for TMDB
   */
  apiBaseUrl: 'https://api.themoviedb.org/3',

  /**
   * TMDB API key - REPLACE WITH YOUR OWN KEY
   * Get your key from: https://developer.themoviedb.org/docs/getting-started
   */
  apiKey: '763ac8aec176095983229286b8345819',

  /**
   * Base URLs for TMDB images
   */
  imageBaseUrl: {
    backdrop: 'https://image.tmdb.org/t/p/original',
    poster: 'https://image.tmdb.org/t/p/w500',
    profile: 'https://image.tmdb.org/t/p/w185'
  },

  /**
   * Production flag
   */
  production: true
};
