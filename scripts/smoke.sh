#!/usr/bin/env bash
BASE="${BASE:-http://localhost:3333}"
ok=0; bad=0

report() {
  if [ "$2" -eq 0 ]; then echo "PASS  $1"; ok=$((ok+1));
  else echo "FAIL  $1  ($3)"; bad=$((bad+1)); fi
}

status() { # name method path expected [json]
  local code
  if [ -n "$5" ]; then
    code=$(curl -s -o /dev/null -w "%{http_code}" -X "$2" -H "Content-Type: application/json" -d "$5" "$BASE$3")
  else
    code=$(curl -s -o /dev/null -w "%{http_code}" -X "$2" "$BASE$3")
  fi
  [ "$code" = "$4" ]; report "$1" $? "got $code, expected $4"
}

value() { # path js-expression
  curl -s "$BASE$1" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{const j=JSON.parse(d);console.log($2)}catch(e){console.log('error')}})"
}

equals() { # name path expr expected
  local got; got=$(value "$2" "$3")
  [ "$got" = "$4" ]; report "$1" $? "got $got, expected $4"
}

atleast() { # name path expr minimum
  local got; got=$(value "$2" "$3")
  [ "$got" != "error" ] && [ "$got" -ge "$4" ] 2>/dev/null; report "$1" $? "got $got, expected at least $4"
}

echo "== Status codes =="
status "cities list"          GET /cities 200
status "cities list (hy)"     GET "/cities?lang=hy" 200
status "city detail"          GET /cities/kapan 200
status "city not found"       GET /cities/nope 404
status "unknown query param"  GET "/cities?foo=1" 400
status "places list"          GET "/places?mostVisited=true" 200
status "bad category"         GET "/places?category=BAD" 400
status "place detail"         GET /places/tatev-monastery 200
status "place not found"      GET /places/nope 404
status "map markers"          GET /map/markers 200
status "history"              GET /history 200
status "road"                 GET /road 200
status "public settings"      GET /settings/public 200
status "stats"                GET /stats 200
status "docs (swagger)"       GET /docs 200
status "contact invalid"      POST /contact 400 '{"name":"A","email":"bad","message":"short"}'
status "contact honeypot"     POST /contact 201 '{"name":"Bot","email":"bot@example.com","message":"Spam message here","website":"x"}'

echo "== Data =="
equals  "6 cities"                 /cities "j.length" 6
atleast "Kapan has 5 hotels"       /cities/kapan "j.hotels.length" 5
atleast "16+ most visited places"  "/places?mostVisited=true" "j.length" 16
atleast "4+ historical places"     "/places?historical=true" "j.length" 4
equals  "Tatev altitude 1500"      /places/tatev-monastery "j.altitudeM" 1500
atleast "6+ map markers"           /map/markers "j.length" 6
atleast "3+ history sections"      /history "j.sections.length" 3
atleast "3+ heritage cards"        /history "j.heritage.length" 3
atleast "3+ road sections"         /road "j.sections.length" 3
atleast "5+ route stops"           /road "j.route.length" 5
atleast "3+ road tips"             /road "j.tips.length" 3
equals  "settings has email"       /settings/public "j['contact.email']" "syunikdreams@gmail.com"

echo
echo "Passed: $ok   Failed: $bad"
[ "$bad" -eq 0 ]
