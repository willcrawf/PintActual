import React, { useState, useEffect } from 'react'

export default function Shared(design) {
    console.log(design)
    let a=Object.values(design)
    return (
    <h3 className={(a[0]===1?'':'e')}>the shared page</h3>
    );
}