import React from 'react';
import {TextInput, KeyboardAvoidingView, View, StyleSheet,Button} from 'react-native';
import PropTypes from 'prop-types';
import Constans from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: Constans.statusBarHeight,
        justifyContent: 'center',
    },
    input: {
        padding: 5,
        margin:10,
        borderColor: 'black',
        borderWidth: 1,
    },
})



export default class AddContactForm extends React.Component{
    static propTypes ={
        addContact: PropTypes.func,
    }

    state={
        name: '',
        phone: '',
        isFormValid: false
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.name !== prevState.name || this.state.phone !== prevState.phone){
        this.validateForm()
        }
    }

getHandler = key => val =>{
 this.setState({[key]: val})
}


validateForm = () =>{
    console.log(this.state)
    const name = this.state.name.split(' ')
    if(this.state.phone.length===10 && this.state.phone>=0 && name.length>=2 && name[name.length-1] && name[0]){
        return this.setState({isFormValid: true})
    }else{
        return this.setState({isFormValid: false})
    }
}
handleSubmit = () =>{
    if(this.state.name.length>=3 && this.state.phone.length===10 && this.state.phone>=0){
        this.props.onSubmit(this.state)
    }
}
    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput 
                style={styles.input} 
                onChangeText={this.getHandler('name')} 
                value={this.state.name}
                placeholder="Name"/>
                <TextInput 
                style={styles.input} 
                onChangeText={this.getHandler('phone')} 
                value={this.state.phone}
                keyboardType="numeric"
                placeholder="Phone"/>
                <Button 
                title="Submit"
                onPress={this.handleSubmit}
                disabled={!this.state.isFormValid}/>
            </KeyboardAvoidingView>
        )
    }
}