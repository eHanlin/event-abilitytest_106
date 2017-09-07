#!/bin/bash
curl -X POST -H 'Content-Type: application/json' -d "{\"Repository\":\"event-abilitytest_106\",\"Tag\":\"${TRAVIS_TAG}\",\"Owner\":\"eHanlin\",\"Password\":\"${EHANLIN_PW}\", \"Name\": \"abilitytest_106\"}" 'http://test.ehanlin.com.tw/event/api/Deploy'
