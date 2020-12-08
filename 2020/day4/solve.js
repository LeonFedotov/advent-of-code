``
  .split('\n\n')
  .map(p => p
    .split('\n')
    .join(' ')
    .split(' ')
    .map(v => v
      .split(':')
      .shift()
    )
    .sort()
    .join()
  )
  .filter(v => 
    v == 'byr,cid,ecl,eyr,hcl,hgt,iyr,pid' || 
    v == 'byr,ecl,eyr,hcl,hgt,iyr,pid'
  )
