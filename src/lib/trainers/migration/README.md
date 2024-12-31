# Trainer Data Migration

For moving trainers' data from the old github domain to the new poke5e.app domain.

1. Inform people that the move to a new domain happened, and that clicking the Start Transfer button is required.
2. Open a popup to the old site which posts the data as a message to the new site.
3. If that fails, give the user the option to manually transfer over IDs.

## Other Attempts

* Using an iframe with the Storage Access API did not work, since iframe storage is partitioned, and the storage access API was only available on Chrome.
* My [Stack Overflow question](https://stackoverflow.com/questions/79322482/transfer-localstorage-data-to-a-new-domain-despite-limited-support-for-storage) went unanswered for a while, but that's where the popup idea originated.
