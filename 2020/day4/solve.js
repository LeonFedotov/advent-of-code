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



const validate = {
	byr: ((v) => parseInt(v, 10) >= 1920 && parseInt(v, 10) <= 2002), 
	iyr: ((v) => parseInt(v, 10) >= 2010 && parseInt(v, 10) <= 2020), 
	eyr: ((v) => parseInt(v, 10) >= 2020 && parseInt(v, 10) <= 2030), 
	hgt: ((v) => /^\d+(cm|in){1,1}$/.test(v) && (
		v.endsWith('cm') ? 
			v.split('cm').filter(h=>h>=150&&h<=193) :
			v.split('in').filter(h=>h>=59&&h<=76)
	).length == 1), 
	hcl: (v) => /^#[a-fA-F0-9]{6,6}$/.test(v),
	ecl: (v) => (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(v) > -1),
	pid: (v) => /^\d{9,9}$/.test(v),
	cid: (v) => true
}

``
	.split('\n\n')
	.map(p => p
		.split('\n')
		.join(' ')
		.split(' ')
		.reduce((res, r) => {
			const [k, v] = r.split(':')
			res[k] = v
			return res
		}, {}) 
	)
	.map(l => [Object.keys(l).sort().join(), l])
	  .filter(([v, p]) => (
		  	v == 'byr,cid,ecl,eyr,hcl,hgt,iyr,pid' || 
		    v == 'byr,ecl,eyr,hcl,hgt,iyr,pid'
	   	) && 
	    Object.entries(p).every(([k, v]) => validate[k](v))
	  )
