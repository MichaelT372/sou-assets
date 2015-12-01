const CurrencyMethods = {
  DEFAULT_CURRENCY: 'GBP',
  DEFAULT_DONATION_BANDS: {
    'GBP': [1, 5, 10, 25, 51],
    'USD': [1, 5, 10, 25, 52],
    'EUR': [1, 5, 10, 25, 53],
    'AUD': [1, 5, 10, 25, 54],
    'CAD': [1, 5, 10, 25, 55],
    'NZD': [1, 5, 10, 25, 56]
  },
  CURRENCY_SYMBOLS: {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': '$',
    'AUD': '$',
    'NVD': '$',
  },

  showDonationBandForCurrency: function(currency) {
    let candidates = [[this.donationBands,          currency],
                  [this.DEFAULT_DONATION_BANDS, currency],
                  [this.donationBands,          'USD'],
                  [this.DEFAULT_DONATION_BANDS, 'USD']];
    for (let ii = 0; ii < candidates.length; ii++) {
      let denomination = candidates[ii][1];
      let band = candidates[ii][0][denomination];
      if (band !== undefined) {
        return this.showDonationBand(band, currency);
      }
    };
  },

  showDonationBand: function(amounts, currency) {
    let $buttonContainer = this.$('.fundraiser-bar__amount-buttons');
    $buttonContainer.html('');
    console.log(currency, this.CURRENCY_SYMBOLS, this.CURRENCY_SYMBOLS[currency]);
    for (let ii = 0; ii < amounts.length; ii++) {
      let tag = `<div class="fundraiser-bar__amount-button" data-amount="${amounts[ii]}">${this.CURRENCY_SYMBOLS[currency]}${amounts[ii]}</div>`
      $buttonContainer.append(tag);
    };
  },

  setCurrency: function(currency) {
    if( this.CURRENCY_SYMBOLS[currency] === undefined) {
      this.currency = this.DEFAULT_CURRENCY;
    } else {
      this.currency = currency;
    }
    this.$('select.fundraiser-bar__currency-selector').find(`option[value="${currency}"]`).prop('selected', true);
    this.showDonationBandForCurrency(currency);
  },

  setupCurrencySelector: function() {
    let $select = this.$('select.fundraiser-bar__currency-selector');
    _.each(_.keys(this.CURRENCY_SYMBOLS), function(currency, ii){
      let option = `<option value="${currency}">${currency}</option>`
      $select.append(option);
    });
  },

  initializeCurrency: function(currency, donationBands) {
    this.setupCurrencySelector();
    this.donationBands = donationBands || this.DEFAULT_DONATION_BANDS;
    this.setCurrency(currency || this.DEFAULT_CURRENCY);
  },
}

module.exports = CurrencyMethods;