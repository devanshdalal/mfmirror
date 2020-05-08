# mfmirror-2.0

mfmirror 1.0 was a django server and client application and it was hard to maintain/run it for free.

mfmirror 2.0 is a serverless app where most logic resides in the react frontend. backend work has
been transferred to aws lambda and dynamodb free tier instances.

## Design

dynamodb tables: funds, baskets, custom-baskets.
funds map: key:scheme name, value: map of constiuents with weights.
general-baskets, custom-baskets: name to map of weighted contrituents map.

```
redux:
    funds = {
        'scheme_name': {
            'portfolio': [
                {'stock': 'c1', 'wt':'w1'}
                ...
            ]
            'update_time': 'date'
        }
        ...
    }

    baskets = {
        'saved_name': [
                {'name': 's1', 'wt': 'w1'},
                ...
            ]
        }
        ...
    }
```

After submit is done or some saved basket is opened, render the basket.
when save is done, the update/insertion is send to the db.custom-baskets

Render a basket:

1. prune non-existent schemes.
2. normalize the weights.

NOTE(devansh): Have a REST call breaker for POSTs when save is called for same payloads.
