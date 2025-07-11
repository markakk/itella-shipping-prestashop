var ItellaModule = new function () {
  var self = this;

  this.init = function () {
    if (typeof window.opc == 'undefined') {
      window.opc = false;
    }
    let map_enabled = true;
    if (typeof window.itella_selector_type !== 'undefined') {
      if (itella_selector_type === 1) {
        map_enabled = false;
      }
    }
    self.initHooks();
    self.checkPlacement();
    var itellaEl = document.getElementById('itella-extra');
    itellaEl.innerHTML = ''; // in case its not empty
    window.itella = new itellaMapping(itellaEl); //.parentNode);
    itella
      .setImagesUrl(itella_images_url)
      .setStrings(JSON.parse(itella_translation))
      .setCountry(itella_country);
    itella.init(map_enabled);
    terminals = self.filterLocations(itella_locations);
    itella.setLocations(terminals, true);
    itella.registerCallback(function (manual) {
      console.log(this.selectedPoint);
      if (!manual) {
        return;
      }

      // make sure radio is checked
      let radio = document.querySelector("input[name*='delivery_option['][value*='" + itella_carrier_pickup_id + ",']");
      if (radio) {
        radio.checked = true;
      }

      // collect data
      var ajaxData = {};
      ajaxData.selected_id = this.selectedPoint.pupCode;
      ajaxData.carrier_id = $("input[name*='delivery_option[']:checked").val().split(',')[0];
      let _token = null;
      if (typeof prestashop !== 'undefined') {
        // prestashop 1.7+
        _token = prestashop.static_token;
      } else {
        _token = static_token; // prestashop 1.6
      }
      ajaxData.itella_token = _token ? _token : itella_token;

      $.ajax(itella_controller_url,
        {
          data: ajaxData,
          type: "POST",
          dataType: "json",
      })
      .always(function (jqXHR, status) {
        jQuery(radio).trigger('change');
      });

      $('#itella_pickup_point_id').val(this.selectedPoint.id);
      self.validate(null, $("input[name*='delivery_option[']:checked"));
    });

    itella.registerCallback(function (manual) {
      /* onepagecheckoutps - v4.2.3 - presteamshop */
      if (typeof OPC !== typeof undefined) {
        if ($('#btn-placer_order').is(':disabled')) {
          prestashop.emit('opc-payment-getPaymentList');
        }
      }
    });

    // set selected pickup point (modal will handle empty values)
    itella.setSelection($('#itella_pickup_point_id').val());

    self.validate(null, $("input[name*='delivery_option[']:checked"));
  }

  this.filterLocations = function (locations) {
    if (typeof itella_locations_filters === 'undefined') {
      return locations;
    }

    let i = locations.length;
    while (i--) {
      if (!Object.hasOwn(locations[i], 'capabilities') || locations[i].capabilities == null) {
        continue;
      }
      for (let j = 0; j < locations[i].capabilities.length; j++) {
        if (itella_locations_filters.exclude_outdoors && locations[i].capabilities[j].name == 'outdoors' && locations[i].capabilities[j].value == 'OUTDOORS') {
          locations.splice(i, 1);
        }
      }
    }

    return locations;
  }

  this.checkPlacement = function () {
    if (itella_ps_version == 1.6) {
      var $master_container = $("input[name^='delivery_option['][value^='" + itella_carrier_pickup_id + ",']").closest('td').next().next();
      $master_container.find('#itella-extra').remove();
      var $itella_extra = $('#itella-extra');
      if ($master_container.find('#itella-extra').length == 0) {
        $master_container.append($itella_extra);
      }
      return true;
    }

    if (itella_ps_version >= 1.7) {
      var $master_container = $("input[name^='delivery_option['][value^='" + itella_carrier_pickup_id + ",']").closest('.delivery-option').find('label');
      $master_container.find('#itella-ps17-extra').remove();
      var $itella_extra = $('#itella-ps17-extra');
      if ($master_container.find('#itella-ps17-extra').length == 0) {
        $master_container.append($itella_extra);
      }
      return true;
    }
  }

  this.initHooks = function () {
    // assume 1.7 and up will be same
    if (itella_ps_version >= 1.7) {
      $('form#js-delivery input[type="radio"][name^="delivery_option["]').on('click', function (e) {
        self.validate(e, this);
      });
      $('form#js-delivery button[type="submit"]').on('click', function (e) {
        self.validate(e, this);
      });
    } else {
      // using 1.6 version
      $(document).on('click', '[name^="delivery_option["]', function (e) {
        if ($("input[name^='delivery_option[']:checked").val().split(',')[0] != itella_carrier_pickup_id) {
          $("input[name^='delivery_option['][value*='" + itella_carrier_pickup_id + ",']").closest('tr')
            .find('#itella-extra').remove();
        }
      });

      $(document).on('click', '.payment_module a', function (e) {
        self.validate(e, this);
      });

      $(document).on('click', 'button[name="processCarrier"]', function (e) {
        self.validate(e, this);
      });
    }
  }

  this.showWarning = function (text) {
    if (!!$.prototype.fancybox) {
      if (this.compareVersions($.fancybox.version, '3.0.0', '>=') && this.compareVersions($().jquery, '1.9.1', '>')) {
        $.fancybox.open({
          src: '<div><p>' + text + '</p></div>',
          type: 'html',
          baseClass: 'itella-fancybox-alert',
          smallBtn: true,
          mouseWheel: false,
          touch: false
        });
      } else {
        $.fancybox.open([
          {
            type: 'inline',
            autoScale: true,
            minHeight: 30,
            content: '<p class="fancybox-error">' + text + '</p>'
          }],
          {
            padding: 0
          });
      }
    } else {
      alert(text);
    }
  }

  this.compareVersions = function (v1, v2, op) {
    const compare = (v1, v2) => {
      let v1Parts = v1.split('.').map(Number);
      let v2Parts = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            let v1Part = v1Parts[i] || 0;
            let v2Part = v2Parts[i] || 0;

            if (v1Part > v2Part) return 1;
            if (v1Part < v2Part) return -1;
        }

        return 0;
    };

    const result = compare(v1, v2);

    switch (op) {
        case '>': return result > 0;
        case '>=': return result >= 0;
        case '<': return result < 0;
        case '<=': return result <= 0;
        case '==': return result === 0;
        case '!=': return result !== 0;
        default: throw new Error('Imvalid operator: ' + op);
    }
  }

  this.validate = function (event, el) {
    var selected_id = $("input[name^='delivery_option[']:checked").val().split(',')[0];
    var itella_selection = $('#itella_pickup_point_id').val();

    if (selected_id == itella_carrier_pickup_id) {
      if (Boolean(itella_selection) === false) {

        if (itella_ps_version >= 1.7) {
          if (event != null && event.target.type === 'submit') {
            event.preventDefault();
            self.showWarning(JSON.parse(itella_translation).select_pickup_point_alert);
          }
          return false;
        }

        if (itella_ps_version == 1.6 && opc) {
          if (event != null) {
            event.preventDefault();
            $("#carrier_area").get(0).scrollIntoView();
            self.showWarning(JSON.parse(itella_translation).select_pickup_point);
          }
          return false;
        }

        if (itella_ps_version == 1.6 && !opc) {
          if (event != null) {
            event.preventDefault();
            $(".delivery_options").get(0).scrollIntoView();
            self.showWarning(JSON.parse(itella_translation).select_pickup_point);
          }
          return false;
        }

        return false;
      }
    }
    return true;
  }
}
