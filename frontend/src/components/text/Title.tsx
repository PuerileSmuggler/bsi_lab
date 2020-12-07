import React, { PureComponent } from 'react'
import { TitleContainer } from './Title.styled'

export class Title extends PureComponent {
    render() {
        return (
            <TitleContainer>
                {this.props.children}
            </TitleContainer>
        )
    }
}

export default Title
