'use client'

import { useInView, InViewProvider, ObserveZone, Target } from 'target-observer'

const targetIds = [
    'section#1',
    'section#2',
    'section#3',
    'section#4',
    'section#5'
]
export default function Example() {
    return (
        <InViewProvider targetIds={targetIds}>
            <div style={{ height: '100vh', width: '100%' }}>
                <div
                    style={{
                        maxWidth: '80rem',
                        width: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '1.25rem',
                        display: 'flex',
                        gap: '2.5rem'
                    }}
                >
                    <Navigation />

                    {/* must use position:relative in parent for ObserveZone to work */}
                    <div
                        style={{ position: 'relative', width: '100%' }}
                        className='target'
                    >
                        {/* add this invisible component to track the target */}
                        <ObserveZone
                            // optional height property, default is 50vh
                            height='70vh'
                            // optional className property, use only for testing
                            className='observer'
                        />

                        {targetIds.map((targetId) => (
                            <Target
                                key={targetId}
                                // must specify the id property for target to work
                                id={targetId}
                                // the html element you want to render
                                as='section'
                                // add styling to your target
                                style={{
                                    height: '90vh',
                                    borderWidth: '4px',
                                    borderColor: '#e5e7eb',
                                    padding: '1.25rem'
                                }}
                                // the height in percent of observing zone to trigger inView state
                                // default is 0.5 (50 percent)
                                entryThreshold={0.3}
                            >
                                Target: {targetId}
                            </Target>
                        ))}
                    </div>
                </div>
            </div>
        </InViewProvider>
    )
}

function Navigation() {
    const inView = useInView() // returns a record with boolean values

    return (
        <div style={{ position: 'sticky', top: '2.5rem', height: '100vh' }}>
            <ul className='list'>
                {targetIds.map((targetId) => {
                    return (
                        <li
                            key={targetId}
                            style={{
                                width: '8rem',
                                textAlign: 'center',
                                ...(inView[targetId] && {
                                    fontWeight: 700,
                                    padding: '0.25rem 0 0.25rem 0',
                                    backgroundColor: '#ef4444',
                                    color: 'white'
                                })
                            }}
                        >
                            <a href={'#' + targetId}>{targetId}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
