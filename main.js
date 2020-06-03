$(document).ready(function(){
  $('#result').hide()
  let hasItems = {'LuckyFoot': false, 'Smelter': false, 'GuppysTail': false,
                  'BrokenModem': false, 'LuckyToe': false, 'DaemonsTail': false,
                  'WatchBattery': false, 'AceSpades': false,'SafetyCap': false,
                  'MatchStick': false, 'ChildsHeart': false, 'RustedKey': false,
                  'RibOfGreed': false, 'Hard': false}

  let itemsNum = {'Luck': 0, 'ContractFromBelow': 0}

  const PICKUP = {'NULL': 0, 'TRINKET': 1, 'CARD': 2, 'PILL': 3, 'COIN': 4,
                  'HEART': 5, 'KEY': 6, 'BOMB': 7, 'CHEST': 8, 'BATTERY': 9,
                  'BAG': 10, 'LOCKEDCHEST': 11}
  const PUKCIP = ['null', 'trinket', 'card', 'pill', 'coin', 'heart', 'key',
                  'bomb', 'chest', 'battery', 'bag', 'lockedchest']
  $("#simulate").click(function(){
    $('#result').show()
    $('#result')[0].innerHTML = 'Calculating...'
    let has=$("input[type='checkbox']");
    for(i = 0;i < has.length;i ++) {
      hasItems[has.eq(i).val()] = has.eq(i)[0].checked
    }
    //console.log(hasItems)

    let nums=$("input[type='number']");
    for(i = 0;i < nums.length;i ++) {
      itemsNum[nums.eq(i)[0].name] = parseInt(nums.eq(i).val())
    }

    itemsNum['Luck'] = Math.min(10, Math.max(itemsNum['Luck'], 0))
    //console.log(itemsNum)
    let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let sum_p1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(i = 0; i < 10000; i ++) {
      let rngPool = 0
      let score = Math.random()
      if(hasItems['LuckyFoot']) {
        score = score * 0.9 + 0.1
      }
      score = score + (Math.random() * itemsNum['Luck'] * 0.1)

      if(hasItems['LuckyToe']) {
        if(hasItems['LuckyFoot'] && itemsNum['Luck'] > 0) {
          score = score * 0.98 + 0.02
        }else {
          score = score * 0.9 + 0.1
        }

      }



      let award = PICKUP['NULL']
      let count = 1

      if(score > 0.22) {
          if(score < 0.3) {
            rngPool = Math.floor(Math.random() * 3)
            if(rngPool == 0) {
              award = PICKUP['CARD']
            }else if(rngPool == 1) {
              award = PICKUP['TRINKET']
            }else {
              award = PICKUP['PILL']
            }
          }else if(score < 0.45) {
            award = PICKUP['COIN']
          }else if(score < 0.5 && hasItems['RibOfGreed']) {
            award = PICKUP['COIN']
          }else if(score < 0.6 && (!hasItems['DaemonsTail'] || Math.floor(Math.random() * 5) == 0)) {
            award = PICKUP['HEART']
          }else if(score < 0.8) {
            award = PICKUP['KEY']
          }else if(score < 0.95) {
            award = PICKUP['BOMB']
          }else {
            award = PICKUP['CHEST']
          }

          if(Math.floor(Math.random() * 20) == 0 ||
          (Math.floor(Math.random() * 15) == 0 && hasItems['WatchBattery'])) {
            award = PICKUP['BATTERY']
          }

          if(Math.floor(Math.random() * 50) == 0) {
            award = PICKUP['BAG']
          }

          if(hasItems['AceSpades'] && Math.floor(Math.random() * 10) == 0) {
            award = PICKUP['CARD']
          }else if(hasItems['SafetyCap'] && Math.floor(Math.random() * 10) == 0) {
            award = PICKUP['PILL']
          }else if(hasItems['MatchStick'] && Math.floor(Math.random() * 10) == 0) {
            award = PICKUP['BOMB']
          }else if(hasItems['ChildsHeart'] && Math.floor(Math.random() * 10) == 0) {
            award = PICKUP['HEART']
          }else if(hasItems['RustedKey'] && Math.floor(Math.random() * 10) == 0) {
            award = PICKUP['KEY']
          }
      }

      if(hasItems['GuppysTail']) {
        if(Math.floor(Math.random() * 3) != 0) {
          if(Math.floor(Math.random() * 2) == 0) {
            award = PICKUP['NULL']
          }
        }else if(Math.floor(Math.random() * 2) == 0) {
          award = PICKUP['LOCKEDCHEST']
        }else {
          award = PICKUP['CHEST']
        }
      }

      if(itemsNum['ContractFromBelow'] > 0 && award != PICKUP['TRINKET']) {
        count += itemsNum['ContractFromBelow']
        let nothingChance = Math.pow(0.666, count - 1)
        if(nothingChance * 0.5 > Math.random()) {
          count = 0;
        }
      }

      if(hasItems['Hard'] && award == PICKUP['HEART']) {
        if(Math.floor(Math.random() * 100) >= 35) {
          award = PICKUP['NULL']
        }
      }


      if(hasItems['BrokenModem'] && Math.floor(Math.random() * 4) == 0 &&
        count >= 1 && (award == PICKUP['COIN'] || award == PICKUP['HEART'] ||
        award == PICKUP['KEY'] || award == PICKUP['BOMB'])) {
          count += 1
        }

      if(count > itemsNum['ContractFromBelow'] + 1 && award != PICKUP['NULL'])  {
        sum_p1[award] ++;
      }else {
        sum[award] ++;
      }

    }
    $('#result')[0].innerHTML = 'Done.<br>';
    for(i = 0;i < sum.length;i ++) {
      if(sum[i] > 0) {
        $('#result')[0].innerHTML += '<br>' + sum[i] / 100.0 + '% ' +
                                    (itemsNum['ContractFromBelow'] + 1) +
                                    ' ' + PUKCIP[i]
      }
      if(sum_p1[i] > 0) {
        $('#result')[0].innerHTML += '<br>' + sum_p1[i] / 100.0 + '% ' +
                                    (itemsNum['ContractFromBelow'] + 2) +
                                    ' ' + PUKCIP[i]
      }
    }
  });
});
