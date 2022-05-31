// Scenario: API_Testing (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 50 },
        'amazon:au:sydney': { loadZone: 'amazon:au:sydney', percent: 50 },
      },
      apm: [],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000', { threshold: 'p(95)<10000', abortOnFail: true }],
  },
  scenarios: {
    API_Testing: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 200, duration: '1m' },
        { target: 2000, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      startVUs: 10,
      gracefulRampDown: '30s',
      exec: 'aPI_Testing',
    },
  },
}

export function aPI_Testing() {
  let response

  group('page_1 - https://mu-mica-test.herokuapp.com/', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/report/recent',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915268555', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(9.2)
  })

  group('page_2 - https://mu-mica-test.herokuapp.com/EquipmentCheck', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/EquipmentCheck', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'if-modified-since': 'Sun, 01 Jan 2012 00:00:00 GMT',
          'if-none-match': '2859841',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915277976', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(2.7)
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/room/bybuilding/1',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2)
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/equipment/byRoom/10',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(4)
  })

  group('page_3 - https://mu-mica-test.herokuapp.com/EquipmentCheck?notes=', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/EquipmentCheck?notes=', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915286827', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.9)
    response = http.get('https://mu-mica-test.herokuapp.com/EquipmentCheck?notes=', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915290878', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(1.6)
  })

  group('page_4 - https://mu-mica-test.herokuapp.com/Reports', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/Reports', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915292711', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(2.6)
    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.7)
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/room/bybuilding/3',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(6.1)
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/room/bybuilding/15',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2.6)
    response = http.get(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/equipment/byRoom/41',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(8.4)
  })

  group('page_5 - https://mu-mica-test.herokuapp.com/EquipmentCheck?notes=COOL%21', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/EquipmentCheck?notes=COOL%21', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915316440', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(1.6)
  })

  group('page_6 - https://mu-mica-test.herokuapp.com/Settings', function () {
    response = http.get('https://mu-mica-test.herokuapp.com/Settings', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.get(
      'https://monmouth.desire2learn.com/d2l/lp/navbars/7081/theme/viewimage/2859841/view?v=20.21.9.32251',
      {
        headers: {
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    response = http.get('https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    response = http.get('https://mu-mica-test.herokuapp.com/sockjs-node/info?t=1647915318220', {
      headers: {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(16.2)

    response = http.post(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building',
      '{"building_name":"NEW BUILDING","building_abv":"COOL!"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )

    response = http.options(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building',
      null,
      {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type',
          'access-control-request-method': 'POST',
          origin: 'https://mu-mica-test.herokuapp.com',
          'sec-fetch-mode': 'cors',
        },
      }
    )
    sleep(1.6)

    response = http.post(
      'https://64vl4ag8uh.execute-api.us-east-1.amazonaws.com/prod/building',
      '{"building_name":"NEW BUILDING","building_abv":"COOL!"}',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
  })
}
