// Detect visitor geo-location and set Glia custom attribute
(function () {
  var GEO_SERVICES = [
    'https://ipwho.is/',
    'https://api.country.is/'
  ];

  function getCountryCode(urls, index) {
    if (index >= urls.length) {
      console.error('[geo-location] All geolocation services failed');
      return;
    }
    fetch(urls[index])
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var code = data.country_code || data.country || data.countryCode || null;
        if (!code) throw new Error('No country code in response');
        setGliaAttribute(code);
      })
      .catch(function (err) {
        console.warn('[geo-location] Service ' + urls[index] + ' failed:', err.message);
        getCountryCode(urls, index + 1);
      });
  }

  function setGliaAttribute(countryCode) {
    var locationValue = (countryCode === 'EE' || countryCode === 'IE') ? 'EE' : 'other';
    console.log('[geo-location] Detected country:', countryCode, '→ location=' + locationValue);

    sm.getApi({ version: 'v1' }).then(function (glia) {
      glia.updateInformation({
        customAttributesUpdateMethod: 'merge',
        customAttributes: { location: locationValue }
      }).then(function () {
        console.log('[geo-location] Glia custom attribute set: location=' + locationValue);
      }).catch(function (error) {
        console.error('[geo-location] Glia updateInformation error:', error);
      });
    }).catch(function (err) {
      console.error('[geo-location] Glia API error:', err);
    });
  }

  getCountryCode(GEO_SERVICES, 0);
})();
