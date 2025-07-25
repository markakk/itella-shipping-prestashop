# Changelog

## [1.3.1]
### Fixed
- Fixed Javascript error if the received pickup point data contains the parameter "capabilities", but its value is NULL

### Improved
- Company code field added to settings
- Added the ability to specify a message for the courier and arrival time when calling a courier
- Added the ability to specify the default courier arrival time in the Store settings
- Added the ability to specify the default courier arrival message in the Module settings
- Courier invitation adapted to changes in the updated API library

### Updated
- itella-api to v2.4.4

## [1.3.0]
### Fixed
- Fixed an error on the order edit page if the list of pickup points could not be retrieved

### Changed
- changed name "Smartpost" to "Smartposti"
- changed logo
- changed map colors

## [1.2.16]
### Updated
- itella-api to v2.3.8.1

## [1.2.15]
### Fixed
- Fixed the permissions of the Venipak Manifests page so that it can be viewed by administrators with lower rights

### Improved
- Added an error message when trying to move to the next step on the Checkout page when a pickup point is not selected
- Added missing translations into Lithuanian

## [1.2.14]
### Fixed
- Disabled orderDetailDisplayed position, because it dont have function
- Fixed an issue where new orders would not check order information when first placed

### Improved
- Added compatibility with module onepagecheckoutps (v4.2.3)
- Added option to disable display of pickup points that have "Outdoors" parameter on Checkout page

## [1.2.13]
### Fixed
- Fixed block loading crash when getting an error when trying to register a shipment from Itella in the block order view
- Fixed error with sending an email when the order status is changed to Shipped on PS 8.x
- Fixed saving of the selected pickup point on PS 8.1

## [1.2.12]
### Improved
- Adapted module to work in Prestashop version 8.1

## [1.2.11]
### Fixed
- Fixed carriers key when checking if they exist
- Fixed reading of translations

### Changed
- Changed Locations API URL

## [1.2.10]
### Fixed
- Reverted pakettikauppa lib SimpleXMLElement.addChild definition change. Prestashop does not work with php 8+ yet.

## [1.2.9]
### Fixed
- Possible fix for "Call courier" modal not showing up in some cases

### Updated
- itella-api to v2.3.7
- logo colors

## [1.2.8] - 2022-07-25
### Added
- Possible support for steasycheckout module (Prestashop 1.7+)
- Call courier via API

## [1.2.7] - 2022-02-01
### Fixed
- Fixed an issue where id_shop was not assigned during store address creation

### Improved
- Store address autofills country code with prestashop set country code
- During store address creation sets as active address by default

## [1.2.6] - 2021-11-16 patch
### Fixed
- Fixed mismatched token that prevented displaying label registration result
- Fixed COD always Yes inside order block information

## [1.2.5] - Store country code fix
### Fixed
- Incorrectly displayed country code for store (always showed LT)

## [1.2.4] - COD Support on Pickuppoint shipment
### Added
- COD additional service is now supported by pickup shipment (product 2711)

### Updated
- itella-api to v2.3.4

## [1.2.3] - Admin AJAX
### Changed
- Admin AJAX calls are now done through module controller, this should fix cross origin issues with multishop having different URL's

## [1.2.2] - Prestashop 1.7.7 support
### Added
- Settings to switch terminal selector type (can be Map or dropdown with search)
- Shipment comment field in Itella form inside order (this will appear in shipment label)
- Support for Prestashop 1.7.7

### Fixed
- Release version not being set in main file
- Possibly fixed an issue where in quick-order module would not receive correct token after customer logins inside checkout
- Order status changing functions now correctly set as static

### Updated
- itella-api to v2.3.2

## [1.2.1] - 2021-02-01
### Updated
- itella-api to v2.3.1

### Changed
- applied changes by the itella-api v2.3.1 library

## [1.2.0] - 2021-01-20
### Fixed
- tracking number save

### Improved
- programic code
- created an order status change when a label is generated
- created ability to add tracking number to email template using {tracking_code} or tracking url using {tracking_url}

### Changed
- name "Itella" to "Smartpost"

### Updated
- translations
- itella-api to v2.3.0

## [1.1.5] - 2020-12-14
### Changed
- Module now sends "Call Courier" email using Prestashop mailing functionality.

## [1.1.4] - 2020-11-26
### Added
- Estonian localization
- Latvian localization
- Russian localization

## [1.1.3] - 2020-11-18
### Updated
- itella-mapping.js to v1.3.1
- itella-api to v2.2.5

## [1.1.2] - 2020-09-09
### Updated
- itella-mapping.js to v1.2.3

## [1.1.1] - 2020-06-05
### Changed
- Carrier names by default is now in lithuanian if LT language is found.

### Updated
- itella-mapping.js to v1.2.2
- itella-api to 2.2.3

## [1.1.0] - Finland
### Added
- Finland support
- Call carrier advanced settings for email subject (required to save) as well Estonia and Finland emails
- Changelog

### Fixed
- locations parsing in pickup templates

### Updated
- itella-mapping.js to v1.2.0
- itella-api to 2.2.1

## [1.0.0] - Initial release
